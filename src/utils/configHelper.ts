import config from "@/config/config";
//TODO: Need integrate configure logic in future
const getConfig = () => {
  const configData = { ...config };

  return { configData };
};

export default getConfig;
