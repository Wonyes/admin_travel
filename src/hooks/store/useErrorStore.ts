import { create } from "zustand";
import { useInputStore } from "./useInputStore";

type ValidationType = "required" | "minValue" | "maxValue" | "format" | "minRange" | "maxRange";

interface ValidationRule {
  type: ValidationType;
  message: string;
  value?: number;
}

interface FieldValidation {
  [key: string]: ValidationRule[];
}

interface ErrorState {
  messages: {
    [key: string]: string;
  };
}

const VALIDATION_RULES: FieldValidation = {
  productName: [
    { type: "required", message: "상품명을 입력해주세요." },
    { type: "maxRange", value: 100, message: "100자 이하로 입력해주세요." },
  ],
  pri: [{ type: "required", message: "대표이미지를 등록해주세요." }],
  productPrice: [
    { type: "required", message: "1,000 이상의 숫자를 입력해주세요." },
    { type: "minValue", value: 1000, message: "1,000 이상의 숫자를 입력해주세요." },
    { type: "format", message: "마지막 숫자를 0으로 변경해주세요." },
    { type: "maxValue", value: 10000000, message: "1,000만원 이하로 입력해주세요." },
  ],
  stockNo: [
    { type: "minValue", value: 1, message: "재고수량을 입력해주세요." },
    { type: "maxValue", value: 1000, message: "1000개 이하로 입력해주세요." },
  ],
  productDescription: [
    { type: "required", message: "내용을 입력해주세요." },
    { type: "minRange", value: 10, message: "10자 이상 입력해주세요." },
    { type: "maxRange", value: 3000, message: "3000자 이하로 입력해주세요." },
  ],
  discountPrice: [{ type: "minValue", value: 99, message: "100원 이상의 숫자를 입력해주세요." }],
  newPassword: [
    { type: "minRange", value: 4, message: "4자 이상 입력해주세요." },
    { type: "maxRange", value: 8, message: "8자 이하로 입력해주세요." },
  ],
  newPasswordConfirm: [
    { type: "format", message: "비밀번호가 일치하지 않습니다." },
    { type: "minRange", value: 4, message: "4자 이상 입력해주세요." },
    { type: "maxRange", value: 8, message: "8자 이하로 입력해주세요." },
  ],
  adminID: [
    { type: "minRange", value: 1, message: "1자 이상 입력해주세요." },
    { type: "maxRange", value: 14, message: "14자 이하로 입력해주세요." },
  ],
};

export const useErrorStore = create<
  ErrorState & {
    validateField: (field: string, value: any) => string[];
    validateForm: (values: Record<string, any>) => boolean;
    setError: (field: string, message: string) => void;
    resetError: () => void;
  }
>((set) => ({
  messages: {},

  validateField: (field, value) => {
    const rules = VALIDATION_RULES[field] || [];
    const errors: string[] = [];

    rules.forEach((rule) => {
      switch (rule.type) {
        case "required": {
          if (!value?.toString().trim()) errors.push(rule.message);
          break;
        }
        case "minValue": {
          if (Number(value) < rule.value) {
            errors.push(rule.message);
          }
          break;
        }
        case "maxValue": {
          if (Number(value) > rule.value) {
            errors.push(rule.message);
          }
          break;
        }
        case "minRange": {
          if (value !== undefined && value !== null) {
            const stringValue = value.toString();
            if (stringValue.length < rule.value) {
              errors.push(rule.message);
            }
          }
          break;
        }
        case "maxRange": {
          if (value !== undefined && value !== null) {
            const stringValue = value.toString();
            if (stringValue.length > rule.value) {
              errors.push(rule.message);
            }
          }
          break;
        }
        case "format": {
          if (field === "productPrice" && String(value).slice(-1) !== "0") {
            errors.push(rule.message);
          }
          if (
            field === "newPasswordConfirm" &&
            value !== useInputStore.getState().user.newPassword
          ) {
            errors.push(rule.message);
          }
          break;
        }
      }
    });

    if (field === "discountRate") {
      const productPrice = useInputStore.getState().product.productPrice;
      const discountPrice = productPrice - (productPrice * Number(value)) / 100;
      if (discountPrice < 100) {
        errors.push("할인가격은 100원 이상이어야 합니다.");
      }
    }

    set((state) => ({
      messages: {
        ...state.messages,
        [field]: errors[0] || "",
      },
    }));

    return errors;
  },

  validateForm: (values) => {
    let isValid = true;
    Object.keys(values).forEach((field) => {
      const errors = useErrorStore.getState().validateField(field, values[field]);
      if (errors.length > 0) isValid = false;
    });
    return isValid;
  },

  setError: (field, message) =>
    set((state) => ({
      messages: { ...state.messages, [field]: message },
    })),

  resetError: () => set({ messages: {} }),
}));
