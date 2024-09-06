import gcoord from "gcoord";

export const getCoordinate = (
  source: "BD09" | "GCJ02",
  target: "BD09" | "GCJ02",
  lntlatList: string[]
) => {
  const parseLngLatList = [];
  for (let i = 0; i < lntlatList.length; i++) {
    const coord = lntlatList[i].split(",") as unknown as [number, number];
    const result = gcoord.transform(
      coord, // 经纬度坐标
      gcoord[source], // 当前坐标系
      gcoord[target] // 目标坐标系
    );

    parseLngLatList.push([...coord, ...result]);
  }
  return parseLngLatList;
};
