"use client";

import React from "react";
import {
  Typography,
  Button,
  Card,
  Row,
  Col,
  Image,
  ConfigProvider,
} from "antd";
import { UploadOutlined, PlayCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { Meta } = Card;

const cardData = [
  {
    id: 1,
    image: "cashewKing.png",
    title: "Song 1",
    description: "Artist 1",
  },
  {
    id: 2,
    image: "/cashewKing.png?height=300&width=300",
    title: "Song 2",
    description: "Artist 2",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=300&width=300",
    title: "Song 3",
    description: "Artist 3",
  },
  {
    id: 4,
    image: "/placeholder.svg?height=300&width=300",
    title: "Song 4",
    description: "Artist 4",
  },
  {
    id: 5,
    image: "/placeholder.svg?height=300&width=300",
    title: "Song 5",
    description: "Artist 5",
  },
  {
    id: 6,
    image: "/placeholder.svg?height=300&width=300",
    title: "Song 6",
    description: "Artist 6",
  },
  {
    id: 7,
    image: "/placeholder.svg?height=300&width=300",
    title: "Song 7",
    description: "Artist 7",
  },
  {
    id: 8,
    image: "/placeholder.svg?height=300&width=300",
    title: "Song 8",
    description: "Artist 8",
  },
];

const theme = {
  token: {
    colorPrimary: "#1890ff", // Changed to blue
    colorBgBase: "#121212",
    colorTextBase: "#F5F5F5",
    colorBgContainer: "#181818",
    colorBgElevated: "#282828",
    colorBorderSecondary: "#282828",
  },
};

export function DtunesHomepage() {
  return (
    <ConfigProvider theme={theme}>
      <div
        style={{
          padding: "2rem",
          maxWidth: "1200px",
          margin: "0 auto",
          backgroundColor: "#121212",
          minHeight: "100vh",
        }}
      >
        <Title
          style={{
            fontSize: "4rem",
            textAlign: "center",
            marginBottom: "2rem",
            color: "#F5F5F5",
          }}
        >
          dtunes.xyz
        </Title>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "3rem",
          }}
        >
          <Button
            type="primary"
            icon={<UploadOutlined />}
            size="large"
            style={{
              height: "60px",
              fontSize: "1.5rem",
              padding: "0 40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1rem",
            }}
          >
            Upload
          </Button>
          <Text style={{ fontSize: "1.5rem", color: "#F5F5F5" }}>
            Have a listen...
          </Text>
        </div>

        <Row gutter={[16, 16]}>
          {cardData.map((card) => (
            <Col xs={24} sm={12} md={8} lg={6} key={card.id}>
              <Card
                hoverable
                style={{ width: "100%", backgroundColor: "#181818" }}
                cover={
                  <Image
                    alt={card.title}
                    src={card.image}
                    preview={{
                      mask: <PlayCircleOutlined style={{ fontSize: "2rem" }} />,
                    }}
                  />
                }
              >
                <Meta
                  title={<span style={{ color: "#F5F5F5" }}>{card.title}</span>}
                  description={
                    <span style={{ color: "#B3B3B3" }}>{card.description}</span>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </ConfigProvider>
  );
}
