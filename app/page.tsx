'use client'
import Loader from "@/components/loader/loader";
import Footer from "@/components/main/footer";
import Banner from "@/components/main/home-sec/banner";
import HomeAbout from "@/components/main/home-sec/home-about";
import HomeApplication from "@/components/main/home-sec/home-application";
import HomeBrand from "@/components/main/home-sec/home-brand";
import HomeCat from "@/components/main/home-sec/home-category";
import HomeMap from "@/components/main/home-sec/home-map";
import HomeProduct from "@/components/main/home-sec/home-product";
import HomeRegister from "@/components/main/home-sec/home-register";

export default function Home() {
  return (
    <>
      <Banner />
      <HomeCat />
      <HomeProduct />
      <HomeRegister />
      <HomeMap />
      <HomeAbout />
      <HomeApplication />
      <HomeBrand />
      <Footer />
    </>
  );
}
