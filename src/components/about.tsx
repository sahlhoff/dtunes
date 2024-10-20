"use client";

import React from "react";
import { Typography, Layout, ConfigProvider } from "antd";
import "../app/globals.css";

import { Image } from "antd";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const theme = {
  token: {
    colorPrimary: "#1890ff",
    colorBgBase: "#121212",
    colorTextBase: "#F5F5F5",
    colorBgContainer: "#181818",
    colorBgElevated: "#282828",
    colorBorderSecondary: "#282828",
  },
};

export function About() {
  return (
    <ConfigProvider theme={theme}>
      <Layout style={{ minHeight: "100vh", backgroundColor: "#121212" }}>
        <Content
          style={{
            padding: "2rem",
            maxWidth: "800px",
            margin: "0 auto",
            textAlign: "center", // Center text and image
          }}
        >
          <Title
            style={{
              fontSize: "3rem",
              marginBottom: "2rem",
              color: "#F5F5F5",
            }}
          >
            About dtunes.xyz
          </Title>
          <Paragraph
            style={{ fontSize: "1.1rem", color: "#F5F5F5", lineHeight: 1.6 }}
          >
            dtunes.xyz is a exciting new music platform designed to connect
            artists and listeners! Our goal is to provide a space where music
            enthusiasts can discover new sounds, share their favorite tracks,
            and support emerging talent.
          </Paragraph>
          <Paragraph
            style={{ fontSize: "1.1rem", color: "#F5F5F5", lineHeight: 1.6 }}
          >
            dTunes.xyz was born out of a passion for music and a desire to
            create a more inclusive and diverse music ecosystem. We believe that
            every artist deserves a chance to be heard, and every listener
            deserves access to a wide range of high-quality music.
          </Paragraph>
          <Paragraph
            style={{ fontSize: "1.1rem", color: "#F5F5F5", lineHeight: 1.6 }}
          >
            So enjoy the magic that is a great decentralized music brought to
            you by creators, dtunes and our friends at the Walrus!
          </Paragraph>

          <Image
            alt={"walrus"}
            src={"/IAMTHEWALRUS.png"} // Update the path as needed
            style={{
              height: "300px",
              width: "300px",
              display: "block",
              margin: "0 auto",
            }}
            preview={false}
          />
          <Paragraph
            style={{ fontSize: "1.1rem", color: "#F5F5F5", lineHeight: 1.6 }}
          >
            Join us! Add some music, listen to some tunes, have fun!
          </Paragraph>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}
