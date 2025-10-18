import { useMemo, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReactModule from "./CustomToolbar";
import { MorphismBox } from "@/assets/style/common/useCommonStyle";
import { useTextStore } from "./store/useTextStore";
import { useMutation } from "@tanstack/react-query";
import { Post } from "./api/reactQuery/mutate/useMutations";

export default function Editor({
  setFileState,
}: {
  setFileState?: React.Dispatch<React.SetStateAction<any>>;
}) {
  const quillRef = useRef<ReactQuill>(null);
  const { productDescription, textChange } = useTextStore();

  const formats: string[] = [
    "header",
    "size",
    "font",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "background",
    "align",
    "script",
    "code-block",
    "clean",
  ];

  // 이미지 업로드를 위한 useMutation
  const { mutate: postMultiImg } = useMutation({
    mutationFn: async ({ body }: { body: FormData; newFiles: File[]; newURLs: string[] }) => {
      return await Post({ url: "product/images", body });
    },
    onSuccess: (res, variables) => {
      const quill = quillRef.current?.getEditor();
      const range = quill?.getSelection();

      if (res.images && res.images.length > 0) {
        res.images.forEach((image: { url: string }) => {
          quill?.insertEmbed(range?.index || 0, "image", image.url);
        });

        setFileState((prev) => ({
          ...prev,
          editorFiles: [...prev.editorFiles, ...variables.newFiles],
          editorFileURLs: [
            ...prev.editorFileURLs,
            ...res.images.map((img: { url: string }) => img.url),
          ],
        }));
      } else {
        console.error("서버 응답에 이미지 URL이 없습니다.");
      }
    },
    onError: (error) => {
      console.error("Image upload failed:", error);
    },
  });

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.setAttribute("multiple", "true");
    input.click();

    input.onchange = () => {
      const files = input.files;
      if (files && files.length > 0) {
        const formData = new FormData();
        Array.from(files).forEach((file) => {
          formData.append("file", file);
        });

        postMultiImg({
          body: formData,
          newFiles: Array.from(files),
          newURLs: Array.from(files).map((file) => URL.createObjectURL(file)),
        });
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: "#toolBar",
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  const handleChange = (value: string) => {
    textChange({
      target: {
        name: "productDescription",
        value,
      },
    } as React.ChangeEvent<HTMLTextAreaElement>);
  };

  return (
    <MorphismBox $pad="0">
      <div id="toolBar">
        <ReactModule />
      </div>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        modules={modules}
        formats={formats}
        value={productDescription}
        onChange={handleChange}
        style={{ height: "300px", width: "100%", borderRadius: "8px" }}
      />
    </MorphismBox>
  );
}
