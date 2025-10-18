import styled from "styled-components";
import { useCallback, useRef } from "react";

import { WhiteBtn } from "@/hooks/useButton";
import { useImg } from "@/assets/style/common/useImg";

import { useTextStore } from "@/hooks/store/useTextStore";

import {
  Between,
  Column,
  Img,
  InfoLineBox,
  RegisTitle,
  Row,
  Text,
} from "@/assets/style/common/useCommonStyle";
import { DetailInfoProps } from "@/typeing/productInterface";

import ErrorMessage from "@/hooks/ErrorMessage";
import SubTitle from "@/components/header/SubTitle";
import { useMutation } from "@tanstack/react-query";
import { Post } from "@/hooks/api/reactQuery/mutate/useMutations";
import Editor from "@/hooks/Editor";

const ImgAreaBox = styled.div`
  border-radius: 4px;
  height: 120px;
  width: 120px;

  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
`;

export default function DetailInfo({ fileState, setFileState }: DetailInfoProps) {
  const { required, imgUpload } = useImg();
  const { productDescription } = useTextStore();

  const { mutate: postImg } = useMutation({
    mutationFn: async ({ body }: { body: FormData }) => {
      return await Post({ url: "product/images", body });
    },
    onSuccess: (res) => {
      setFileState((prev) => ({
        ...prev,
        fileURL: res.images[0].url,
      }));
    },
    onError: () => {
      setFileState((prev) => ({
        ...prev,
        file: null,
        fileURL: "",
      }));
    },
  });

  const { mutate: postMultiImg } = useMutation({
    mutationFn: async ({ body }: { body: FormData; newFiles: File[]; newURLs: string[] }) => {
      return await Post({ url: "product/images", body });
    },
    onSuccess: (res, variables) => {
      setFileState((prev) => ({
        ...prev,
        addFiles: [...prev.addFiles, ...variables.newFiles],
        addFileURLs: [...prev.addFileURLs, res.images[0].url],
      }));
    },
    onError: (_, variables) => {
      setFileState((prev) => ({
        ...prev,
        addFiles: prev.addFiles.filter((file) => !variables.newFiles.includes(file)),
        addFileURLs: prev.addFileURLs.filter((url) => !variables.newURLs.includes(url)),
      }));
    },
  });

  const addRef = useRef<HTMLInputElement | null>(null);
  const uploadRef = useRef<HTMLInputElement | null>(null);

  const imgload = (ref: React.RefObject<HTMLInputElement>) => {
    ref.current?.click();
  };

  const validateFile = (file: File) => {
    const allowedExtensions = ["jpg", "jpeg", "gif", "png", "bmp"];
    const fileExtension = file.name.split(".").pop()?.toLowerCase() || "";
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedExtensions.includes(fileExtension)) {
      throw new Error("이미지 파일만 업로드 가능합니다. (jpg, gif, png, bmp)");
    }

    if (file.size > maxSize) {
      throw new Error("파일 크기는 10MB를 초과할 수 없습니다.");
    }

    return true;
  };

  const onChangeImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    if (!validateFile(file)) return;

    const reader = new FileReader();
    const formData = new FormData();
    formData.append("file", file);

    postImg({
      body: formData,
    });

    // 미리보기는 서버 응답 대기 중에 표시
    reader.onload = (event) => {
      const previewUrl = event.target?.result as string;
      setFileState((prev) => ({
        ...prev,
        file,
        fileURL: previewUrl,
      }));
    };

    reader.readAsDataURL(file);
  };

  const onRemoveImg = useCallback((): void => {
    if (fileState.fileURL) {
      try {
        // base64 URL이 아닐 경우만 revoke
        if (!fileState.fileURL.startsWith("data:")) {
          URL.revokeObjectURL(fileState.fileURL);
        }
      } catch (error) {
        console.error("URL.revokeObjectURL 실패:", error);
      }
    }

    // input 초기화
    if (uploadRef.current) {
      uploadRef.current.value = "";
    }

    // 상태 완전 초기화
    setFileState((prev) => ({
      ...prev,
      file: null,
      fileURL: "",
    }));
  }, [fileState.fileURL, setFileState]);

  const onChangeAddImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const remainingSlots = 5 - fileState.addFileURLs.length;

      if (remainingSlots <= 0) {
        alert("최대 5개의 파일만 업로드할 수 있습니다.");
        return;
      }

      const newFiles = Array.from(e.target.files).slice(0, remainingSlots);
      const newURLs = newFiles.map((file) => URL.createObjectURL(file));

      const formData = new FormData();
      newFiles.forEach((file) => {
        formData.append("file", file);
      });

      postMultiImg({
        body: formData,
        newURLs,
        newFiles,
      });
    }
  };

  const onRemoveAddImg = useCallback(
    (index: number) => {
      URL.revokeObjectURL(fileState.addFileURLs[index]);

      setFileState((prev) => ({
        ...prev,
        addFiles: prev.addFiles.filter((_, i) => i !== index),
        addFileURLs: prev.addFileURLs.filter((_, i) => i !== index),
      }));
    },
    [fileState.addFileURLs, fileState.addFiles, setFileState]
  );

  return (
    <>
      <SubTitle
        pad={"28px 0 28px"}
        title={"상세 정보"}
      />
      <InfoLineBox>
        <RegisTitle>
          <Text>대표이미지</Text>
          <Img
            $w="16px"
            $h="16px"
            src={required}
            alt="required"
          />
        </RegisTitle>
        <Column $gap="8px">
          <ImgAreaBox>
            <input
              type="file"
              name="pri"
              ref={uploadRef}
              style={{ display: "none" }}
              accept=".png,.jpg,.jpeg,.png"
              onChange={onChangeImg}
              required
            />
            <Img
              className="img-clear"
              $w="100%"
              $h="100%"
              $radius="4px"
              src={fileState.fileURL || imgUpload}
              onClick={(event) => {
                event.preventDefault();
              }}
              alt="img-upload"
            />
          </ImgAreaBox>
          <WhiteBtn
            $w="120px"
            onClick={() => (fileState.fileURL ? onRemoveImg() : imgload(uploadRef))}
            msg={fileState.fileURL ? "파일 삭제" : "파일 올리기"}
            $pad="4px 12px"
          />
          <ErrorMessage name="pri" />
          <Text $class="caption">
            권장 크기 : 1000 X 1000(윈도 대상 750 X 1000), 300 X 300 이상 10MB 이하의
            jpg,gif,png,bmp 형식의 정지 이미지만 등록됩니다.
          </Text>
        </Column>
      </InfoLineBox>
      <InfoLineBox>
        <RegisTitle>
          <Text>추가이미지</Text>
        </RegisTitle>
        <Column $gap="8px">
          <Row $gap="8px">
            <input
              type="file"
              ref={addRef}
              style={{ display: "none" }}
              accept=".png,.jpg,.jpeg,.png"
              onChange={onChangeAddImg}
              multiple
              required
            />
            {fileState.addFileURLs.length > 0 ? (
              fileState.addFileURLs.map((url, index) => (
                <ImgAreaBox key={index}>
                  <Img
                    className="img-clear"
                    $w="100%"
                    $h="100%"
                    $radius="4px"
                    src={url}
                    onClick={() => imgload(addRef)}
                    alt="img-upload"
                  />
                </ImgAreaBox>
              ))
            ) : (
              <ImgAreaBox>
                <Img
                  className="img-clear"
                  $w="100%"
                  $h="100%"
                  $radius="4px"
                  src={imgUpload}
                  alt="img-upload"
                />
              </ImgAreaBox>
            )}
          </Row>
          <Row $gap="12px">
            <WhiteBtn
              $w="120px"
              onClick={() => imgload(addRef)}
              msg={"파일 올리기"}
              $pad="4px 12px"
            />
            {fileState.addFileURLs.length !== 0 && (
              <WhiteBtn
                $w="120px"
                onClick={() => onRemoveAddImg(fileState.addFileURLs.length - 1)}
                msg={"파일 삭제"}
                $pad="4px 12px"
              />
            )}
          </Row>
          <Text $class="caption">추가이미지는 5개까지 등록 가능합니다.</Text>
          <Text $class="caption">
            권장 크기 : 1000 X 1000(윈도 대상 750 X 1000), 300 X 300 이상 10MB 이하의
            jpg,gif,png,bmp 형식의 정지 이미지만 등록됩니다.
          </Text>
        </Column>
      </InfoLineBox>
      <InfoLineBox>
        <RegisTitle>
          <Text>설명</Text>
          <Img
            $w="16px"
            $h="16px"
            src={required}
            alt="required"
          />
        </RegisTitle>
        <Column
          $gap="8px"
          $w="100%"
        >
          <Editor setFileState={setFileState} />
          <Between>
            <Text
              as="label"
              htmlFor="productDescription"
              $class="caption"
            >
              작성된 상품 설명은 상품 상세 이미지 하단에 입력됩니다.
            </Text>
            <Text $class="caption">{productDescription.length} / 3,000</Text>
          </Between>
        </Column>
      </InfoLineBox>
    </>
  );
}
