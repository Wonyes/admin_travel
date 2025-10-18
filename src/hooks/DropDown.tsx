import { useEffect, useState } from "react";
import { usePageStore } from "./store/usePageStore";

import DropMenu from "../containers/DropMenu";
import useQueryString from "./useQueryString";

import { MenuArrow } from "../assets/style/common/useIconCompo";
import { Between, SelectBox, Text } from "../assets/style/common/useCommonStyle";

interface DropDownProps {
  data?: MenuProps[];
  request?: () => void;
  name?: string;
  notSave?: boolean;
}

interface MenuProps {
  meaning: string;
  enumValue: string;
}

export default function DropDown({ notSave, name, data, request }: DropDownProps) {
  const { setState, selectMeaning, setSelectMeaning } = usePageStore();
  const { getParams, setParams } = useQueryString();

  const params = getParams();

  const [isDrop, setIsDrop] = useState(false);

  const toggleDrop = () => {
    setIsDrop(!isDrop);
  };

  const isState = (enumValue: string, meaning: string) => {
    if (enumValue === "" || meaning === "전체") {
      setState(null); // ← null로 초기화
    } else {
      setState(enumValue);
    }
    setSelectMeaning({ [name]: meaning });
    if (!notSave) {
      setParams({ [name]: enumValue, [`${name}Meaning`]: meaning });
    }
    setIsDrop(false);
  };

  useEffect(() => {
    if (request) request();
  }, []);

  const currentMeaning =
    params[`${name}Meaning`] ||
    selectMeaning[name] ||
    (data && data[0]?.meaning === "전체" ? data[0]?.meaning : "");

  return (
    <SelectBox onClick={toggleDrop}>
      <Between>
        <Text $class="subText">{currentMeaning || "필터를 선택해 주세요."}</Text>
        <MenuArrow size="20px" />
      </Between>
      {isDrop && (
        <DropMenu
          data={data}
          isState={isState}
        />
      )}
    </SelectBox>
  );
}
