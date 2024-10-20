"use client";

import React, { useEffect, useState } from "react";
import { Typography, Layout, ConfigProvider, Card, Row, Col } from "antd";
import "../app/globals.css";
import GeoPattern from "geopattern";
import { publisher, walrusRead } from "@/lib/walrus";
const { Meta } = Card;

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

const backendURL = "https://dtunes-server.fly.dev";

const getSongs = async (setWalrusSongs: any) => {
  const rawSongs = await fetch(`${backendURL}/list`).then((response) =>
    response.json()
  );

  const promises = rawSongs.map(async (s) => {
    const url = await walrusRead(s.id);
    return { ...s, url };
  });

  const songs = await Promise.all(promises);

  setWalrusSongs(songs);
};

export function Catalog() {
  const [walrusSongs, setWalrusSongs] = useState<any[]>([]);

  useEffect(() => {
    getSongs(setWalrusSongs);
  }, []);

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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              rowGap: "60px",
            }}
          >
            <Title
              style={{
                fontSize: "3rem",
                margin: "0",
                color: "#F5F5F5",
                marginRight: "80px",
              }}
            >
              The Walrus Catalog
            </Title>
            <Image
              alt={"walrus"}
              src={"/IAMTHEWALRUS.png"} // Update the path as needed
              style={{
                height: "100px",
                width: "100px",
                display: "block",
                margin: "0 auto",
              }}
              preview={false}
            />
          </div>
          <Paragraph
            style={{
              fontSize: "1.1rem",
              color: "#F5F5F5",
              lineHeight: 1.6,
              marginRight: "28px",
              marginTop: "40px",
            }}
          >
            This our tracker page for songs uploaded to Walrus! Contribute by
            submitting!
          </Paragraph>

          {walrusSongs && walrusSongs.length > 0 && (
            <Row gutter={[16, 16]}>
              {walrusSongs.map((card) => (
                <Col xs={24} sm={12} md={8} lg={6} key={card.id}>
                  <Card
                    hoverable
                    style={{
                      width: "100%",
                      backgroundColor: "#181818",
                      transition: "transform 0.3s",
                      position: "relative", // Ensure zIndex works
                    }}
                    cover={
                      <Image
                        alt={card.title}
                        src={GeoPattern.generate(card.title).toDataUri()}
                        style={{ height: "300px", width: "300px" }}
                        preview={false}
                      />
                    }
                  >
                    <Meta
                      title={
                        <span style={{ color: "#F5F5F5" }}>{card.title}</span>
                      }
                      description={
                        <span style={{ color: "#B3B3B3" }}>
                          {card.description}
                          {card.id}
                        </span>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Content>
      </Layout>
    </ConfigProvider>
  );
}
