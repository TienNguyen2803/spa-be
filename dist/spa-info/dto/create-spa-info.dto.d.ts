declare class CreateBannerDto {
    image_url: string;
    title: string;
    subtitle: string;
    order: number;
    is_active: boolean;
    type: number;
}
declare class CreateWorkingHourDto {
    day: string;
    open_time: string;
    close_time: string;
}
export declare class CreateSpaInfoDto {
    name: string;
    logo_url: string;
    address: string;
    phone: string;
    email: string;
    description: string;
    seo_title: string;
    seo_description: string;
    facebook_url: string;
    instagram_url: string;
    banners?: CreateBannerDto[];
    workingHours?: CreateWorkingHourDto[];
}
export {};
