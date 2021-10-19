import { PhotoResource } from "./photo-resource";

export class Landmark {
    "title": string;
    "short_info": string;
    "createdAt": string;
    "updatedAt": string;
    "url": string;
    "photo": PhotoResource;
    "photo_thumb": PhotoResource;
    "location": [];
    "objectId": string;
}