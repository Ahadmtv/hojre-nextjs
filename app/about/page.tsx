import Footer from '@/components/main/footer'
import HeaderSecondary from '@/components/main/header-secondary'
import React from 'react'

const AboutPage = () => {

  return (
    <div>
      <HeaderSecondary />
      <div className="bg-orange-50">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-x-10 p-10">
          <div className="flex justify-center items-center">
            <div className="">
              <img src="./assets/images/about/03.png" alt="درباره"></img>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col gap-y-2">
              <p className="text-orange-600 text-lg">نشان تجاری ما</p>
              <h2 className="text-2xl">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است </h2>
              <p className="font-vazir-thin text-gray-800">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه درصد گذشته حال و آینده </p>
            </div>
            <div className="mt-10 flex flex-col gap-y-3">
              <div className="flex">
                <div className="flex justify-center items-start w-[10%]"><img className="rounded-full w-full" src="./assets/images/about/icon/01.jpg" alt="icon"></img></div>
                <div className="pr-2 font-vazir-thin w-[90%]">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز </div>
              </div>
              <div className="flex">
                <div className="flex justify-center items-start w-[10%]"><img className="rounded-full w-full" src="./assets/images/about/icon/02.jpg" alt="icon"></img></div>
                <div className="pr-2 font-vazir-thin w-[90%]">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز </div>
              </div>
              <div className="flex">
                <div className="flex justify-center items-start w-[10%]"><img className="rounded-full w-full" src="./assets/images/about/icon/03.jpg" alt="icon"></img></div>
                <div className="pr-2 font-vazir-thin w-[90%]">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AboutPage