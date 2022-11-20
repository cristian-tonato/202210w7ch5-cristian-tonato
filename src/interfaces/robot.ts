export type Robot = {
    id: string | number;
    name: string;
    img: string;
    speed: number;
    strength: number;
    creationDate: string;
};
export type ProtoRobot = {
    name?: string;
    img?: string;
    speed?: number;
    strength?: number;
    creationDate?: string;
};
