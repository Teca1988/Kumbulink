import{r as a,s as n,j as e}from"./index-Bx09HWwW.js";const i="/Kumbulink/icons/success.svg",l=()=>{const[s,c]=a.useState(6),t=n();return a.useEffect(()=>{if(s>0){const r=setTimeout(()=>c(s-1),1e3);return()=>clearTimeout(r)}else t("/login")},[s,t]),e.jsxs("div",{className:"flex min-h-screen flex-col items-center bg-white px-6",children:[e.jsx("div",{className:"h-14 w-full"}),e.jsxs("div",{className:"flex flex-col items-center justify-center flex-1",children:[e.jsx("img",{src:i,alt:"Success",className:"w-16 h-16 mb-6 text-[#DA7739]"}),e.jsx("h1",{className:"text-primary-green text-3xl font-medium mb-4",children:"Boas Vindas!"}),e.jsx("p",{className:"text-center text-gray-600 text-base leading-relaxed",children:"Agora você faz parte da rede Kumbulink, você poderá enviar e receber dinheiro de onde estiver."}),e.jsxs("p",{className:"text-center text-gray-400 text-sm mt-16 leading-relaxed",children:["Você será redirecionado para a página de Login em ",s," segundos"]})]})]})};export{l as Success,l as default};
