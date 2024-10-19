"use client";

import React, { useState } from "react";
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
import ReactAudioPlayer from "react-audio-player";

const { Title, Text } = Typography;
const { Meta } = Card;

const cardData = [
  {
    id: 1,
    image: "/cashewKing.png?height=300&width=300",
    title: "Song 1",
    description: "Artist 1",
    source: "/music.mp3",
  },
  {
    id: 2,
    image: "/cashewKing.png?height=300&width=300",
    title: "Song 2",
    description: "Artist 2",
    source: "/music.mp3",
  },
  {
    id: 3,
    image: "/cashewKing.png?height=300&width=300",
    title: "Song 3",
    description: "Artist 3",
    source: "/music.mp3",
  },
  {
    id: 4,
    image: "/cashewKing.png?height=300&width=300",
    title: "Song 4",
    description: "Artist 4",
    source: "/music.mp3",
  },
  {
    id: 5,
    image: "/cashewKing.png?height=300&width=300",
    title: "Song 5",
    description: "Artist 5",
    source: "/music.mp3",
  },
  {
    id: 6,
    image: "/cashewKing.png?height=300&width=300",
    title: "Song 6",
    description: "Artist 6",
    source: "/music.mp3",
  },
  {
    id: 7,
    image: "/cashewKing.png?height=300&width=300",
    title: "Song 7",
    description: "Artist 7",
    source: "/music.mp3",
  },
  {
    id: 8,
    image: "/cashewKing.png?height=300&width=300",
    title: "Song 8",
    description: "Artist 8",
    source: "/music.mp3",
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
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [audioSource, setAudioSource] = useState<string>(
    "path/to/your/audio/file.mp3"
  );

  const handleCardClick = (cardId: number, source: string) => {
    setSelectedCardId(cardId);
    setAudioSource(source);
  };

  return (
    <ConfigProvider theme={theme}>
      <div
        style={{
          width: "100%",
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
          <ReactAudioPlayer
            src={audioSource}
            controls
            style={{
              width: "40%",
              marginTop: "1rem",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
        </div>

        <Row gutter={[16, 16]}>
          {cardData.map((card) => (
            <Col xs={24} sm={12} md={8} lg={6} key={card.id}>
              <Card
                hoverable
                onClick={() => handleCardClick(card.id, card.source)}
                style={{
                  width: "100%",
                  backgroundColor: "#181818",
                  transform:
                    selectedCardId === card.id ? "scale(1.1)" : "scale(1)",
                  transition: "transform 0.3s",
                  zIndex: selectedCardId === card.id ? 1 : 0, // Bring selected card to front
                  position: "relative", // Ensure zIndex works
                }}
                cover={
                  <Image
                    alt={card.title}
                    src={card.image}
                    preview={false} // Disable image preview
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
