export interface CheckButtonProps {
  name: string;
  titles: [string, string, string] | [string] | [string, string];
  state?: number;
  setState: React.Dispatch<React.SetStateAction<{ discount: number; sale: number }>>;
}

export interface FileState {
  file: File | null;
  fileURL: string;
  addFiles: File[];
  addFileURLs: string[];
  editorFiles: File[];
  editorFileURLs: string[];
}

export interface BasicInfoProps {
  state?: boolean;
  isEachCheck?: (id: number) => void;
  isChecked?: (id: number) => boolean;
  useSelect: { discount: number; sale: number; channel?: string };
  setUseSelect: React.Dispatch<React.SetStateAction<{ discount: number; sale: number }>>;
}

export interface ProductRequestBody {
  productName: string;
  price: number;
  stock: number;
  discountRate?: number;
  productState: "SALE" | "SUSPENSION" | "OUTOFSTOCK";
  pri: string;
  pdi?: string[];
  description: string;
  discountPrice: number;
}

export interface DetailInfoProps {
  fileState: FileState;
  setFileState: React.Dispatch<React.SetStateAction<FileState>>;
}

interface ChannelDetail {
  channelEnum: "TRAVELIDGE" | "NAVER";
  detailUrl: string;
  name: string;
}

export interface ProductRequestProps {
  id: number;
  productName: string;
  price: number;
  stock: number;
  discountRate: number;
  channelDetail: ChannelDetail;
  productStateName: string;
  discountPrice: number;
  isChecked: (id: number) => boolean;
  isEachCheck: (id: number) => void;
  productDelete: (id: number) => void;
}
