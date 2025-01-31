import "./Singlepage.scss";
import Map from "../../components/map/Map";
import Slider from "../../components/slider/Slider";
import { useLoaderData, useNavigate } from "react-router-dom";
import DOMPurify from 'dompurify';
import apiRequest from "../../lib/apiRequest.js"
import { useContext, useState } from "react";
import {AuthContext} from "../../../context/AuthContext.jsx"

export default function SinglePage() {
  const post = useLoaderData()
  const [saved, setSaved] = useState(post.isSaved);
  const [send, setSend]=useState(false);
  const {currentUser}= useContext(AuthContext);
  console.log(post)
  
  const navigate=useNavigate();

  
  const handleSave= async()=>{
    if(!currentUser){
      navigate("/login");
    } 
     // AFTER REACT 19 UPDATE TO USEOPTIMISTIK HOOK
     setSaved((prev) => !prev);
    try{
      await apiRequest.post("/users/save", {postId: post.id});
    }catch(err){
      console.log(err)
      setSaved((prev) => !prev);
    }
  }
   
  const handleHiMessage = async () => {
    if (!currentUser) {
      navigate("/login");
    }
    try {
      const res = await apiRequest.post("/chats", { receiverId: post.userId });
      const chatId = res.data.id;
      console.log(chatId);
 
      // Send the initial "hello" message
      await apiRequest.post(`/messages/${chatId}`, { text: "Hi" });

      // Optionally, navigate to the chat view
      setSend(!send);
      // navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  }
    // Function to format the price based on the type of post
  const formatPrice = () => {
    if (post.type === "rent") {
      return post.price >= 1000 ? (post.price / 1000).toFixed(1) + "k/month" : post.price + "/month";
    } else {
       // For buy type
    if (post.price >= 10000000) {
      // If price is 1 crore or more
      return (post.price / 10000000).toFixed(2) + " Cr";
    } else {
      // If price is less than 1 crore (in lakhs)
      return (post.price / 100000).toFixed(2) + " lakh";
    }
    }
  };

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images}/>
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="price">{formatPrice()}</div>
              </div>
              <div className="user">
                <img src={post.user.avatar} alt="" />
                <span>{post.user.username}</span>
              </div>
            </div>
             <div
              className="bottom"
              dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(post.postDetail.desc)}}>
                 
                </div> 
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
               <div className="featureText">
                <span>Utitlities</span>
                  {
                    post.postDetail.utilities === 'owner' ? (
                      <p>Owner is responsible</p>
                    ) : (<p>Tenant is responsible</p>)
                  }
                  
               </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                {
                    post.postDetail.pet === 'allowed' ? (
                      <p>Pets are allowed</p>
                    ) : (<p>Pets are not allowed</p>)
                  }
               </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Income policy</span>
                <p>{post.postDetail.income}</p>
               </div>
            </div>
            
          </div>
          <p className="title">Room Size</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{post.postDetail.size} sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{post.bedroom} beds</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{post.bathroom} bathroom</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p>
                  {post.postDetail.school > 999
                    ? post.postDetail.school / 1000 + "km"
                    : post.postDetail.school + "m"}{" "}
                  away
                </p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>
                  {post.postDetail.bus > 999
                    ? post.postDetail.bus / 1000 + "km"
                    : post.postDetail.bus + "m"}{" "}
                  away
                </p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>
                {post.postDetail.restaurant > 999
                    ? post.postDetail.restaurant / 1000 + "km"
                    : post.postDetail.restaurant + "m"}{" "}
                  away
                </p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div  className="buttons"
          >
            <button onClick={handleHiMessage}
             style={{
              backgroundColor: send ? "#fece51" : "white",
            }}
            >
              <img src="/chat.png" alt="" />
              {send ? "Message sent" : "Send the message"}
            </button>
            <button onClick={handleSave}
             style={{
              backgroundColor: saved ? "#fece51" : "white",
            }}
            >
              <img src="/save.png" alt="" />
              {saved ? "Place Saved" : "Save the Place"}
            </button>
             
          </div>
        </div>
      </div>
    </div>
  );
}

