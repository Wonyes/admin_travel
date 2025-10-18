import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { Img, MorphismBox, Row, Text } from "@/assets/style/common/useCommonStyle";

import BasicInfo from "./BasicInfo";
import DetailInfo from "./DetailInfo";

import { BlueBtn } from "@/hooks/useButton";
import { useOverlay } from "@/hooks/useOverlay";

import { useInputStore } from "@/hooks/store/useInputStore";
import { useTextStore } from "@/hooks/store/useTextStore";
import { FileState, ProductRequestBody } from "@/typeing/productInterface";

import { useErrorStore } from "@/hooks/store/useErrorStore";
import { useChecked } from "@/util/useChecked";
import { useMutation } from "@tanstack/react-query";
import { Post } from "@/hooks/api/reactQuery/mutate/useMutations";
import { useImg } from "@/assets/style/common/useImg";

const RegisBox = styled.div`
  width: 100%;
  height: 100%;

  padding: 12px;
  border-radius: 8px;

  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
`;

export default function ProductRegis() {
  const navigate = useNavigate();
  const { warning } = useImg();

  const { product } = useInputStore();
  const { productDescription } = useTextStore();
  const { validateForm } = useErrorStore();

  const { openAlert } = useOverlay();
  const { checkedIds, isChecked, isEachCheck } = useChecked();

  const [useSelect, setUseSelect] = useState({ discount: 2, sale: 1 });
  const [fileState, setFileState] = useState<FileState>({
    file: null,
    fileURL: "",
    addFiles: [],
    addFileURLs: [],
    editorFiles: [],
    editorFileURLs: [],
  });

  const { mutateAsync: regisProduct } = useMutation({
    mutationFn: async (requestBody: ProductRequestBody) => {
      const requests = [
        Post({
          url: "product",
          body: requestBody,
        }),
      ];

      if (checkedIds.includes(2)) {
        requests.push(
          Post({
            url: "naver/product",
            body: requestBody,
          })
        );
      }

      return Promise.all(requests);
    },
    onSuccess: () => {
      openAlert({
        title: "상품등록이 완료되었습니다.",
        message: "상품목록으로 이동합니다.",
        mainBtn: "완료",
        onFunc: () => navigate("/p.inquiry"),
      });
    },
    onError: () => {
      openAlert({
        title: "상품등록에 실패하였습니다.",
        message: "필수항목을 확인해주세요.",
        mainBtn: "확인",
      });
    },
  });

  const productRegis = () => {
    const requestBody: ProductRequestBody = {
      productName: product.productName,
      price: product.productPrice,
      stock: product.stockNo,
      discountRate: product.discountRate ? product.discountRate : null,
      productState:
        useSelect.sale === 1 ? "SALE" : useSelect.sale === 2 ? "SUSPENSION" : "OUTOFSTOCK",
      pri: fileState.fileURL,
      pdi: fileState.addFileURLs,
      description: productDescription,
      discountPrice: product.discountPrice,
    };
    const validationValues = {
      productName: requestBody.productName,
      productPrice: requestBody.price,
      stockNo: requestBody.stock,
      productState: requestBody.productState,
      pri: requestBody.pri,
      productDescription: requestBody.description,
      discountPrice: requestBody.discountPrice,
    };

    const isValid = validateForm(validationValues);
    if (!isValid)
      return openAlert({
        title: "상품등록에 실패하였습니다.",
        message: "필수항목을 확인해주세요.",
        mainBtn: "확인",
      });

    regisProduct(requestBody);
  };

  return (
    <>
      <MorphismBox
        className="red-line"
        $h="fit-content "
      >
        <Row
          $gap="8px"
          $align="flex-start"
        >
          <Img
            $w="20px"
            $h="20px"
            src={warning}
            alt="warning"
          />
          <Text $class={["subTitle", "red"]}>
            게스트 권한으로는 네이버 상품 등록이 불가능합니다.
          </Text>
        </Row>
      </MorphismBox>
      <MorphismBox>
        <BasicInfo
          isChecked={isChecked}
          useSelect={useSelect}
          isEachCheck={isEachCheck}
          setUseSelect={setUseSelect}
        />
      </MorphismBox>
      <MorphismBox $h="auto">
        <DetailInfo
          fileState={fileState}
          setFileState={setFileState}
        />
      </MorphismBox>
      <RegisBox>
        <BlueBtn
          msg="등록"
          $size="var(--s-title)"
          onClick={productRegis}
        />
      </RegisBox>
    </>
  );
}
