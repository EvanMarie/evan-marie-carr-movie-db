import HStackFull from "~/buildingBlockComponents/hStackFull";
import Text from "~/buildingBlockComponents/text";

export default function FilmInfoLabelValue({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <HStackFull className="text-lg">
      <Text className="text-yellow-300 textShadow">{label}</Text>
      <Text className="subtleTextShadow">{value}</Text>
    </HStackFull>
  );
}
