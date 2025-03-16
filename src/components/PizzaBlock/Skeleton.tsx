import ContentLoader from "react-content-loader"

const Skeleton = () => (

  
  <div className="pizza-block-wrapper">    
    <ContentLoader className="pizza-block"
      speed={2}
      width={280}
      height={465}
      viewBox="0 0 280 465"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
   
    >
    <circle cx="135" cy="125" r="109" /> 
    <rect x="0" y="251" rx="10" ry="10" width="280" height="22" /> 
    <rect x="0" y="289" rx="10" ry="10" width="280" height="88" /> 
    <rect x="0" y="401" rx="10" ry="10" width="84" height="37" /> 
    <rect x="36" y="428" rx="0" ry="0" width="9" height="4" /> 
    <rect x="135" y="400" rx="10" ry="10" width="142" height="37" />
  </ContentLoader>
  </div>
  )
  
  export default Skeleton