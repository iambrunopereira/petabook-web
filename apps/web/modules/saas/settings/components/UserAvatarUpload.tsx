"use client";

import { useSession } from "@saas/auth/hooks/use-session";
import { Spinner } from "@shared/components/Spinner";
import { UserAvatar } from "@shared/components/UserAvatar";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { CropImageDialog } from "./CropImageDialog";

const emojiOptions = ["🐶", "🐕", "🐩", "🦮", "🐕‍🦺", "🐾"];

export function UserAvatarUpload({
	onSuccess,
	onError,
}: {
	onSuccess: (base64OrEmoji: string) => void;
	onError: () => void;
}) {
	const { user } = useSession();
	const [uploading, setUploading] = useState(false);
	const [cropDialogOpen, setCropDialogOpen] = useState(false);
	const [image, setImage] = useState<File | null>(null);
	const [previewImage, setPreviewImage] = useState<string | null>(null); // State for Base64 preview
	const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null); // State for selected emoji
	const [inputType, setInputType] = useState<"emoji" | "image">("emoji"); // State for input type

	const { getRootProps, getInputProps } = useDropzone({
		onDrop: (acceptedFiles) => {
			setImage(acceptedFiles[0]);
			setCropDialogOpen(true);
		},
		accept: {
			"image/png": [".png"],
			"image/jpeg": [".jpg", ".jpeg"],
		},
		multiple: false,
	});

	if (!user) {
		return null;
	}

	const onCrop = async (croppedImageData: Blob | null) => {
		if (!croppedImageData) {
			return;
		}

		setUploading(true);
		try {
			// Convert cropped image to Base64
			const reader = new FileReader();
			reader.onloadend = () => {
				const base64Image = reader.result as string;
				setPreviewImage(base64Image); // Set the Base64 image for preview
				setSelectedEmoji(null); // Clear emoji selection
				onSuccess(base64Image); // Pass Base64 image to the onSuccess callback
			};
			reader.readAsDataURL(croppedImageData); // Convert Blob to Base64
		} catch (e) {
			onError();
		} finally {
			setUploading(false);
		}
	};

	const handleEmojiSelect = (emoji: string) => {
		setSelectedEmoji(emoji);
		setPreviewImage(null); // Clear image preview
		onSuccess(emoji); // Pass the selected emoji to the onSuccess callback
	};

	return (
		<>
			{/* Dropdown to choose input type */}
			<div className="mb-4">
				<label className="block font-medium text-gray-700 text-sm">
					Choose Input Type
				</label>
				<select
					className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
					value={inputType}
					onChange={(e) => {
						setInputType(e.target.value as "emoji" | "image");
						setSelectedEmoji(null); // Clear emoji selection
						setPreviewImage(null); // Clear image preview
					}}
				>
					<option value="emoji">Use Emoji</option>
					<option value="image">Upload Image</option>
				</select>
			</div>

			{/* Conditionally render emoji picker or image upload */}
			{inputType === "emoji" && (
				<div className="mt-4 flex gap-2">
					{emojiOptions.map((emoji) => (
						<button
							key={emoji}
							type="button"
							className={`rounded-md p-2 text-2xl ${
								selectedEmoji === emoji
									? "bg-primary text-white"
									: "bg-gray-100"
							}`}
							onClick={() => handleEmojiSelect(emoji)}
						>
							{emoji}
						</button>
					))}
				</div>
			)}

			{inputType === "image" && (
				<div className="relative size-24 rounded-full">
					{/* Image Upload */}
					<div {...getRootProps()} className="cursor-pointer">
						<input {...getInputProps()} />
						<UserAvatar
							className="size-24 cursor-pointer text-xl"
							avatarUrl={previewImage || user.image} // Show preview image or user image
							name={user.name ?? ""}
						/>
					</div>

					{uploading && (
						<div className="absolute inset-0 z-20 flex items-center justify-center bg-card/90">
							<Spinner className="size-6" />
						</div>
					)}
				</div>
			)}

			{/* Crop Dialog */}
			<CropImageDialog
				image={image}
				open={cropDialogOpen}
				onOpenChange={setCropDialogOpen}
				onCrop={onCrop}
			/>
		</>
	);
}
