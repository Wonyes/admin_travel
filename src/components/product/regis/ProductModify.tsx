import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import { MorphismBox } from "@/assets/style/common/useCommonStyle";

import BasicInfo from "./BasicInfo";
import DetailInfo from "./DetailInfo";

import { BlueBtn } from "@/hooks/useButton";
import { useOverlay } from "@/hooks/useOverlay";

import { useInputStore } from "@/hooks/store/useInputStore";
import { useTextStore } from "@/hooks/store/useTextStore";
import { FileState, ProductRequestBody } from "@/typeing/productInterface";

import { useErrorStore } from "@/hooks/store/useErrorStore";
import { useChecked } from "@/util/useChecked";
import { useProductModify } from "@/hooks/api/reactQuery/query/useProduct";
import { useMutation } from "@tanstack/react-query";
import { Put } from "@/hooks/api/reactQuery/mutate/useMutations";
import Loading from "@/hooks/Loading";
import { useGlobalStore } from "@/hooks/store/useGlobalStore";

const RegisBox = styled.div`
  width: 100%;
  height: 100%;

  padding: 12px;
  border-radius: 8px;

  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
`;

export default function ProductModify() {
  const { no } = useParams();
  const navigate = useNavigate();
  const { decoded } = useGlobalStore();

  const { validateForm } = useErrorStore();
  const { productDescription, setInitialText } = useTextStore();
  const {
    product: { productName, productPrice, stockNo, discountRate, discountPrice },
    setInitialInput,
  } = useInputStore();

  const { openAlert } = useOverlay();
  const [useSelect, setUseSelect] = useState({ discount: 2, sale: 1, channel: "" });
  const [fileState, setFileState] = useState<FileState>({
    file: null,
    fileURL: "",
    addFiles: [],
    addFileURLs: [],
    editorFiles: [],
    editorFileURLs: [],
  });
  const { data: getModifyData } = useProductModify({ url: `product/${no}` });
  const { isChecked, isEachCheck } = useChecked();
  useEffect(() => {
    if (getModifyData) {
      setInitialInput({
        product: {
          productName: getModifyData.productName,
          productPrice: getModifyData.price,
          stockNo: getModifyData.stock,
          discountRate: getModifyData.discountRate,
          discountPrice: getModifyData.discountPrice,
          recommend: getModifyData.recommend ?? false,
        },
      });

      if (getModifyData.description) {
        setInitialText({
          productDescription: getModifyData.description,
        });
      }

      setUseSelect({
        discount: getModifyData.discountRate ? 1 : 2,
        sale:
          getModifyData.productState === "SALE"
            ? 1
            : getModifyData.productState === "SUSPENSION"
            ? 2
            : 3,
        channel: getModifyData.channel,
      });

      setFileState((prev) => ({
        ...prev,
        fileURL: getModifyData.pri,
        addFileURLs: getModifyData.pdi,
      }));
    }
  }, [getModifyData]);

  const { mutate: regis } = useMutation({
    mutationFn: ({ url, body }: { url: string; body: object }) => {
      return Put({
        url: url,
        body: body,
      });
    },
    onSuccess: () => {
      openAlert({
        title: "상품수정이 완료되었습니다.",
        mainBtn: "완료",
        onFunc: () => navigate("/p.inquiry"),
      });
    },
    onError: () => {
      openAlert({
        title: "상품수정에 실패하였습니다.",
        message: "통신장애로 인한 오류가 발생하였습니다.",
        message2: "지속적인 오류가 발생할 시 문의 해주시길 바랍니다.",
        mainBtn: "확인",
      });
    },
  });

  const productRegis = () => {
    const requestBody: ProductRequestBody = {
      productName: productName,
      price: productPrice,
      stock: stockNo,
      discountRate: discountRate,
      productState:
        useSelect.sale === 1 ? "SALE" : useSelect.sale === 2 ? "SUSPENSION" : "OUTOFSTOCK",
      pri: fileState.fileURL,
      pdi: fileState.addFileURLs,
      description: productDescription,
      discountPrice: discountPrice,
    };

    const validationValues = {
      productName: requestBody.productName,
      productPrice: requestBody.price,
      stockNo: requestBody.stock,
      discountRate: requestBody.discountRate,
      productState: requestBody.productState,
      pri: requestBody.pri,
      productDescription: requestBody.description,
      discountPrice: requestBody.discountPrice,
    };

    const isValid = validateForm(validationValues);
    if (!isValid)
      return openAlert({
        title: "상품수정에 실패하였습니다.",
        message: "필수항목을 확인해주세요.",
        mainBtn: "확인",
      });

    regis({
      url: useSelect.channel === "NAVER" ? `naver/product/${no}` : `product/${no}`,
      body: requestBody,
    });
  };

  if (!getModifyData) {
    return <Loading />;
  }

  if (getModifyData.channel === "NAVER" && decoded?.role === "ROLE_GUEST") {
    navigate("/p.inquiry");
  }

  return (
    <>
      <MorphismBox>
        <BasicInfo
          state={true}
          isChecked={isChecked}
          useSelect={useSelect}
          isEachCheck={isEachCheck}
          setUseSelect={setUseSelect}
        />
      </MorphismBox>
      <MorphismBox>
        <DetailInfo
          fileState={fileState}
          setFileState={setFileState}
        />
      </MorphismBox>
      <RegisBox>
        <BlueBtn
          msg="수정"
          $size="var(--s-title)"
          onClick={productRegis}
        />
      </RegisBox>
    </>
  );
}
