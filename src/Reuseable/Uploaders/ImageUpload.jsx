import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ImageUpload = (props) => {
  const { fileList, setFileList, setUploading, imageError } = props;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      console.log(file)
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList: newFileList }) => {
    let showMessage = true; // Flag to track if the warning message has been shown
    if (newFileList.length > 30) {
      const extraFiles = newFileList.slice(30); // Get the extra files beyond the limit
      if (showMessage) {
        //message.warning("You can only upload up to 30 images.");
        showMessage = false; // Set the flag to false to prevent further warning messages
      }
      newFileList.splice(30, newFileList.length - 30); // Truncate the array to only keep the first 30 files
      setFileList(newFileList);
      setPreviewOpen(false); // Close the preview modal if it was open
      if (extraFiles.length > 0) {
        console.log(
          `The first 30 images have been selected. ${extraFiles.length} extra images will be ignored.`
        );
      }
    } else {
      setFileList(newFileList);
      // Check if any images are still uploading
      const isUploading = newFileList.some(
        (file) => !file.url && !file.preview
      );
      setUploading(isUploading);
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <>
      <Upload
        name="files"
        action={`${process.env.REACT_APP_API_BASE_URL}upload/multiple`}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        multiple={true}
        crossOrigin="anonymous"
        style={{
          width: "20px",
          height: "20px",
          borderColor: `red`,
        }}
      >
        {fileList?.length >= 30 ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
        zIndex={1070}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
          crossOrigin="anonymous"
        />
      </Modal>
    </>
  );
};

export default ImageUpload;
