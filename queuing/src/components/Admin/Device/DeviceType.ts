export interface DType {
  id: string;
  iddevice: string;
  name: string;
  Ip: string;
  type: string;
  username: string;
  password: string;
  tag: string;
}

export const DeviceType: DType[] = [
  {
    id: new Date().toJSON().toString(),
    iddevice: "1234",
    name: "1234",
    Ip: "1234",
    type: "1234",
    username: "1234",
    password: "1234",
    tag: "1234",
  },
];


