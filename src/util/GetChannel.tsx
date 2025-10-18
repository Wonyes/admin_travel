import { Img } from "@/assets/style/common/useCommonStyle";
import { useImg } from "@/assets/style/common/useImg";
import styled from "styled-components";

const A = styled.a``;

export default function GetChannel({ channel }) {
  const { travel, naver } = useImg();

  const getChannelImage = () => {
    switch (channel?.channelEnum || channel) {
      case "NAVER":
        return naver;
      case "TRAVELIDGE":
        return travel;
      default:
        return travel;
    }
  };

  return (
    <A
      href={channel?.detailUrl}
      target="_blank"
    >
      <Img
        $w="20px"
        $h="20px"
        src={getChannelImage()}
        alt="channel"
      />
    </A>
  );
}
