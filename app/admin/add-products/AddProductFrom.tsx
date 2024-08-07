'use client'

import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import CustomCheckBox from "@/app/components/inputs/CustomCheckBox";
import Input from "@/app/components/inputs/Input";
import SelectColour from "@/app/components/inputs/SelectColour";
import TextArea from "@/app/components/inputs/TextArea";
import { categories } from "@/utils/categories";
import { colors } from "@/utils/colors";
import { useState, useEffect, useCallback } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import firebaseApp from "@/libs/firebase";
import axios from "axios";
import { useRouter } from "next/navigation";

export type ImageType = {
    color: string;
    colorCode: string;
    image: File | null;
}

export type UploadedImageType = {
    color: string;
    colorCode: string;
    image: string;
}

const AddProductsForm = () => {
    const [isLoading, setIsLoading] = useState(false); // State for loading indicator
    const [images, setImages] = useState<ImageType[] | null>(null); // State to store image data
    const [isProductCreated, setIsProductCreated] = useState(false); // State to check if product is created
    const router = useRouter()

    // Initialize form handling using react-hook-form
    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            description: '',
            brand: '',
            category: '',
            inStock: false,
            images: [],
            price: ""
        }
    });

    // Watch changes in images and update form value
    useEffect(() => {
        setCustomValue('images', images);
    }, [images]);

    // Reset form when a product is created
    useEffect(() => {
        if (isProductCreated) {
            reset();
            setImages(null);
            setIsProductCreated(false);
        }
    }, [isProductCreated, reset]);

    // Handle form submission
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log("Product Data", data);
        setIsLoading(true);
        let uploadedImages: UploadedImageType[] = [];

        if (!data.category) {
            setIsLoading(false);
            return toast.error("Category is not selected");
        }

        if (!data.images || data.images.length === 0) {
            setIsLoading(false);
            return toast.error("No selected image");
        }

        const handleImageUploads = async () => {
            toast("Creating product, please wait...");
            try {
                for (const item of data.images) {
                    if (item.image) {
                        const fileName = new Date().getTime() + '-' + item.image.name;
                        const storage = getStorage(firebaseApp);
                        const storageRef = ref(storage, `products/${fileName}`);
                        const uploadTask = uploadBytesResumable(storageRef, item.image);

                        await new Promise<void>((resolve, reject) => {
                            uploadTask.on(
                                'state_changed',
                                (snapshot) => {
                                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                    console.log('Upload is ' + progress + '% done');
                                    switch (snapshot.state) {
                                        case 'paused':
                                            console.log('Upload is paused');
                                            break;
                                        case 'running':
                                            console.log('Upload is running');
                                            break;
                                    }
                                },
                                (error) => {
                                    console.log("Error uploading image", error);
                                    reject(error);
                                },
                                () => {
                                    getDownloadURL(uploadTask.snapshot.ref).then(
                                        (downloadURL) => {
                                            uploadedImages.push({
                                                ...item,
                                                image: downloadURL
                                            });
                                            console.log('File available at', downloadURL);
                                            resolve();
                                        }
                                    ).catch((error) => {
                                        console.log("Error getting the download URL", error);
                                        reject(error);
                                    });
                                }
                            );
                        });
                    }
                }
            } catch (error) {
                setIsLoading(false);
                console.log("Error handling image uploads", error);
                return toast.error('Error handling image uploads');
            }
        };

        await handleImageUploads();
        const productData = {...data,images:uploadedImages ,price: parseFloat(data.price)}
        axios.post('/api/product',productData).then(()=>{
            toast.success('Product created')
            setIsProductCreated(true)
            router.refresh()
        }).catch((error) =>{
            toast.error("Something went wrong when saving product to db")
        })
        .finally(()=>{
            setIsLoading(false)
        })

    };

    const category = watch("category"); // Watch for category changes

    // Function to set custom value in the form
    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldValidate: true,
            shouldTouch: true
        });
    };

    // Function to add image to state
    const addImageToState = useCallback((value: ImageType) => {
        setImages((prev) => {
            if (!prev) {
                return [value];
            }
            return [...prev, value];
        });
    }, []);

    // Function to remove image from state
    const removeImageFromState = useCallback((value: ImageType) => {
        setImages((prev) => {
            if (prev) {
                const filteredImages = prev.filter(
                    (item) => item.color !== value.color
                );
                return filteredImages;
            }
            return prev;
        });
    }, []);

    return (
        <>
            {/* Heading component to display the title */}
            <Heading title="Add a Product" center />
            
            {/* Input fields for product details */}
            <Input
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="price"
                label="Price"
                disabled={isLoading}
                register={register}
                errors={errors}
                type="number"
                required
            />
            <Input
                id="brand"
                label="Brand"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <TextArea
                id="description"
                label="Description"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <CustomCheckBox id="inStock" register={register} label="This product is in stock " />

            {/* Category selection */}
            <div className="w-full font-medium">
                <div className="mb-2 font-semibold">Select a category</div>
                <div className="grid grid-cols-2 md:grid-cols-3 max-h-[50vh] overflow-y-auto gap-3 ">
                    {categories.map((item) => {
                        if (item.label === "All") {
                            return null;
                        }
                        return (
                            <div key={item.label} className="col-span">
                                <CategoryInput
                                    onClick={(category) => setCustomValue('category', category)}
                                    selected={category === item.label}
                                    label={item.label}
                                    icon={item.icon}
                                />
                            </div>
                        );
                    })}
                </div>

                {/* Color selection and image upload */}
                <div className="w-full flex flex-col flex-wrap gap-4 mt-6">
                    <div>
                        <div className="font-bold">Select the available product colors and upload their images</div>
                        <div className="text-sm">You must upload an image for each of the color selected otherwise your color selection will be ignored</div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {colors.map((item, index) => {
                            return (
                                <SelectColour
                                    key={index}
                                    item={item}
                                    removeImageFromState={removeImageFromState}
                                    addImageToState={addImageToState}
                                    isProductCreated={false}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
            
            {/* Submit button */}
            <Button label={isLoading ? "Loading..." : "Add Product"} onClick={handleSubmit(onSubmit)} />
        </>
    );
}

export default AddProductsForm;
