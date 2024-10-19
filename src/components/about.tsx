"use client";

import React from "react";
import { Typography, Layout, ConfigProvider } from "antd";
import "../app/globals.css";

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
          style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}
        >
          <Title
            style={{
              fontSize: "3rem",
              textAlign: "center",
              marginBottom: "2rem",
              color: "#F5F5F5",
            }}
          >
            About dtunes.xyz
          </Title>
          <Paragraph
            style={{ fontSize: "1.1rem", color: "#F5F5F5", lineHeight: 1.6 }}
          >
            dtunes.xyz is a revolutionary music platform designed to connect
            artists and listeners in a unique and immersive way. Our goal is to
            provide a space where music enthusiasts can discover new sounds,
            share their favorite tracks, and support emerging talent.
          </Paragraph>
          <Paragraph
            style={{ fontSize: "1.1rem", color: "#F5F5F5", lineHeight: 1.6 }}
          >
            Founded in 2024, dtunes.xyz was born out of a passion for music and
            a desire to create a more inclusive and diverse music ecosystem. We
            believe that every artist deserves a chance to be heard, and every
            listener deserves access to a wide range of high-quality music.
          </Paragraph>
          <Paragraph
            style={{ fontSize: "1.1rem", color: "#F5F5F5", lineHeight: 1.6 }}
          >
            Our platform offers a seamless experience for uploading, streaming,
            and discovering music. Whether you are an artist looking to share
            your creations or a music lover searching for your next favorite
            track, dtunes.xyz has something for everyone.
          </Paragraph>
          <Paragraph
            style={{ fontSize: "1.1rem", color: "#F5F5F5", lineHeight: 1.6 }}
          >
            We are committed to providing a user-friendly interface that makes
            it easy to navigate through our vast library of music. Our advanced
            algorithms help you discover new artists and tracks based on your
            listening habits, ensuring that you are always finding fresh and
            exciting content.
          </Paragraph>
          <Paragraph
            style={{ fontSize: "1.1rem", color: "#F5F5F5", lineHeight: 1.6 }}
          >
            At dtunes.xyz, we also prioritize fair compensation for artists. We
            have implemented a transparent royalty system that ensures artists
            are fairly rewarded for their work. By supporting artists directly
            through our platform, you are helping to sustain a vibrant and
            diverse music community.
          </Paragraph>
          <Paragraph
            style={{ fontSize: "1.1rem", color: "#F5F5F5", lineHeight: 1.6 }}
          >
            Join us on this musical journey and be part of a community that
            celebrates creativity, diversity, and the power of music to bring
            people together. Whether you are here to listen, create, or both,
            dtunes.xyz is your home for all things music.
          </Paragraph>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}
