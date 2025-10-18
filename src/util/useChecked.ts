import { useState } from "react";

export const useChecked = (items?: any[]) => {
  const [checkedIds, setCheckedIds] = useState<number[]>([]);

  const isCheckAll = (checked: boolean) => {
    setCheckedIds(checked ? items.map((item) => item.id) : []);
  };

  const isEachCheck = (id: number) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const isAllChecked = items ? items.length > 0 && checkedIds.length === items.length : false;

  const isChecked = (id: number) => checkedIds.includes(id);

  return {
    checkedIds,
    isAllChecked,
    isChecked,
    isCheckAll,
    isEachCheck,
  };
};
