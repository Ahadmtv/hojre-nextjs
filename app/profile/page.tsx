// 'use client'
// import { useRouter } from 'next/navigation';
// import React, { useEffect, useState } from 'react'

// const ProfilePage = () => {

//     // فعال یا غیرفعال بودن حالت ویرایش فرم
//     const [editOn, setEditOn] = useState<boolean>(false);

//     // const user:any= useAppSelector((state) => state.auth.user);
//     const dispatch = useAppDispatch();
//     // const uid = user.uid;
//     // const { userData, isLoading } = GetUserData(uid);
//     const [file, setFile] = useState<any>(null);
//     const navigate = useRouter();
//     const types = ["image/png", "image/jpg", "image/jpeg"];

//     // تعریف استیت های فرم اطلاعات فردی
//     const [fullName, setFullName] = useState<string>("");
//     const [phoneNumber, setPhoneNumber] = useState<string>("");
//     const [address, setAddress] = useState<string>("");
//     const [addressCode, setAddressCode] = useState<string>("");

//     //آپدیت استیت ها با تغییر کاربر
//     useEffect(()=>{
//         setFullName(user.displayName);
//         setPhoneNumber(user.phoneNumber);
//         setAddress(user.address);
//         setAddressCode(user.addressCode);
//     },[user])

//     // آغاز فرایند آپلود عکس کاربر و ثبت آدرس عکس در دیتابیس
//     const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//         let selected: any = e.target.files;
//         if (selected.length === 1 && types.includes(selected[0].type)) {
//             setFile(selected[0]);
//         } else {
//             setFile(null);
//         }
//     }
//     const { url } = UseStorage(file, uid);

//     useEffect(() => {
//         const update = async () => {
//             dispatch(setLoading(true));
//             if (url) {
//                 const ref = doc(db, "users", uid);
//                 await updateDoc(ref, { photoURL: url });
//                 const newdata = await getDoc(ref);
//                 dispatch(setUser({ ...newdata.data() }));
//                 dispatch(setLoading(false));
//             } else {
//                 dispatch(setLoading(false));
//             }
//         }
//         update();
//     }, [url,dispatch,uid]);

//     //تابع خروج کاربر از وضعیت  وارد شده
//     const handleExit = (e: MouseEvent<HTMLButtonElement>) => {
//         e.preventDefault();
//         navigate("/");
//         dispatch(setLoading(true));
//         signOut(Auth)
//             .then(() => {
//                 toast.success("خارج شدید");
//                 dispatch(setUser({}));
//                 dispatch(setLoading(false));
//             })
//             .catch(() => {
//                 toast.error("خطایی رخ داده است");
//                 dispatch(setLoading(false));
//             })
//     }

//     //تابع ثبت تغییرات اطلاعات فردی کاربر
//     const handleSave = async (e: MouseEvent<HTMLButtonElement>) => {
//         dispatch(setLoading(true));
//         e.preventDefault();
//         const ref = doc(db, "users", uid);
//         await updateDoc(ref, {
//             displayName: fullName,
//             phoneNumber: phoneNumber,
//             address: address,
//             addressCode: addressCode
//         });
//         let newData = await getDoc(ref);
//         dispatch(setUser({ ...newData.data() }));
//         setEditOn(false);
//         dispatch(setLoading(false));
//     }
//     return (
//         <>
//             <Navbar />
//             <HeaderSecondry />
//             {isLoading && <Loader />}
//             {userData &&
//                 <div>
//                     <div className="container mx-auto flex justify-center">
//                         <div className="bg-gray-100 rounded-xl my-shadow -translate-y-16 w-full md:w-[70%] md:max-w-[700px]">
//                             <div className="flex justify-between bg-white my-shadow rounded-xl relative">
//                                 <Link className="relative z-10 h-12 whitespace-nowrap flex justify-center items-center bg-white rounded-lg mr-3 mt-3 px-1 text-sm bg-opacity-50 hover:bg-opacity-100 ease-linear transition-all duration-150" to="/cart"><i className="fa-solid fa-bag-shopping px-2"></i>سبد خرید</Link>
//                                 <div className="rounded-full relative z-10">
//                                     <div className="image-wrapper relative inline-block">
//                                         <img src={user.photoURL ? user.photoURL: window.location.origin +"/assets/images/clients/avater.png"} className={` w-[150px] h-[150px] rounded-full  flex justify-center items-center ${user.photoURL? "":"bg-gray-400 bg-opacity-40 border-white border-[1px]"}`} alt="profile" />
//                                         {!user.photoURL && <div className="absolute bottom-0 right-1/2 rounded-full bg-gray-400 bg-opacity-40 flex justify-center items-center p-2 translate-x-1/2"><i className="fa-solid fa-plus text-white text-2xl"></i></div>}
//                                         <label htmlFor="file-input" className="absolute text-xl top-0 left-0  cursor-pointer text-white w-full h-full bg-gray-700 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-100 ease-linear rounded-full bg-opacity-60">
//                                             <i className="fa fa-upload text-white text-3xl"></i>
//                                         </label>
//                                         <input onChange={(e) => handleChange(e)} type="file" id="file-input" className="" hidden />
//                                     </div>
//                                 </div>
//                                 <button onClick={(e) => handleExit(e)} className="relative z-10 h-12 whitespace-nowrap flex justify-center items-center bg-white rounded-lg ml-3 mt-3 px-1 text-sm bg-opacity-50 hover:bg-opacity-100 ease-linear transition-all duration-150"><i className="fa-solid fa-right-from-bracket px-2"></i>  خروج</button>
//                                 <img className="absolute top-0 right-0 rounded-xl h-full w-full" src={window.location.origin + "/assets/images/bg-img/10.jpg"} alt="بکگراند"></img>
//                             </div>
//                             <div className="p-10 flex  justify-center items-center">
//                                 <div className="flex flex-col items-start w-full gap-y-4">
//                                     <div className="flex w-full border-2 p-4 items-center rounded-md">
//                                         <label>نام و نام خانوادگی</label>
//                                         <input onChange={(e) => setFullName(e.target.value)} className={`mr-auto px-2 py-2  rounded-md border-gray-300 border-[1px] focus:outline-none ${editOn ? "bg-white" : "pointer-events-none bg-gray-100"}`} type="text" value={fullName} readOnly={!editOn} />
//                                     </div>
//                                     <div className="flex w-full border-2 p-4 items-center rounded-md">
//                                         <label>شماره همراه</label>
//                                         <input onChange={(e) => setPhoneNumber(e.target.value)} className={`mr-auto px-2 py-2  rounded-md border-gray-300 border-[1px] focus:outline-none ${editOn ? "bg-white" : "pointer-events-none bg-gray-100"}`} type="text" value={phoneNumber} readOnly={!editOn} />
//                                     </div>
//                                     <div className="flex flex-col w-full gap-y-2 border-2 p-4 rounded-md">
//                                         <label>آدرس</label>
//                                         <textarea onChange={(e) => setAddress(e.target.value)} className={`px-2 py-2 w-full  rounded-md border-gray-300 border-[1px] focus:outline-none ${editOn ? "bg-white" : "pointer-events-none bg-gray-100"}`} value={address} readOnly={!editOn}></textarea>
//                                     </div>
//                                     <div className="flex w-full border-2 p-4 items-center rounded-md">
//                                         <label>کد پستی</label>
//                                         <input onChange={(e) => setAddressCode(e.target.value)} className={`mr-auto px-2 py-2  rounded-md border-gray-300 border-[1px] focus:outline-none ${editOn ? "bg-white" : "pointer-events-none bg-gray-100"}`} type="text" value={addressCode} readOnly={!editOn} />
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="flex justify-center items-center py-4">
//                                 {!editOn &&
//                                     <button className="bg-blue-700 text-white rounded-md px-2 py-1 text-xl hover:bg-opacity-0 hover:text-blue-700 border-2 border-blue-700 transition-all ease-linear duration-150" onClick={() => setEditOn(!editOn)}>ویرایش اطلاعات</button>
//                                 }
//                                 {editOn &&
//                                     <button className="bg-blue-700 text-white rounded-md px-2 py-1 text-xl hover:bg-opacity-0 hover:text-blue-700 border-2 border-blue-700 transition-all ease-linear duration-150" onClick={(e) => handleSave(e)}>ذخیره تغییرات</button>
//                                 }
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             }
//         </>
//     )
// }

// export default ProfilePage