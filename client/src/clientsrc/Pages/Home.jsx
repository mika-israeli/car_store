import { Box, Typography } from "@mui/material";
import React from "react";
import { useContext } from "react";
import UserRecommendation from "../components/UserRecommendation.jsx";
import AuthContext from "../Context/AuthProvider";
import FacebookLogin from "react-facebook-login";
import { FacebookShareButton, FacebookIcon } from "react-share";
import Call from "../components/call/Call";
import video from "../../assets/video.mp4";
const Home = () => {
  const value = useContext(AuthContext);

  return (
    <Box width={"100%"} display="flex" justifyContent={"center"}>
      <Box
        // display={'flex'}
        width={"50%"}
        flexDirection={"column"}
        alignItems="center"
        gap={5}
      >
        <header>
          <h1>Welcome to our dealership</h1>
        </header>
        <section>
          <p>
            We are a family owned dealership that specializes in selling
            vehicles. we have a large variety of vehicles for you to choose
            from.
          </p>
          <aside style={{ border: "1px solid black" }}>
            <nav>
              <ul>
                <li>
                  <a href="https://github.com/mika-israeli/car_store.git">
                    github repo
                  </a>
                </li>
                <li>
                  <a href="https://www.colman.ac.il/">where we learned</a>
                </li>
                <li>
                  <a href="/">students</a>
                </li>
              </ul>
            </nav>
          </aside>
        </section>

        <video
          controls
          src={video}
          style={{
            width: "750px",
            height: "auto",
          }}
        />
      </Box>
      <Call />
    </Box>
  );
};

export default Home;
