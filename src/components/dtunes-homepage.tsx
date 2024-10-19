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
  message,
  Upload,
  UploadProps,
} from "antd";
import { UploadOutlined, PlayCircleOutlined } from "@ant-design/icons";
// import ReactAudioPlayer from "react-audio-player";
import Player from "@madzadev/audio-player";
import "@madzadev/audio-player/dist/index.css";
import { walrusStore, walrusRead, publisher } from "@/lib/walrus";
import { cardData, tracks } from "./songConstants";
import GeoPattern from "geopattern";

const { Title, Text } = Typography;
const { Meta } = Card;

const colors = {
  tagsBackground: "#1890ff",
  tagsText: "#ffffff",
  tagsBackgroundHoverActive: "#6e65f1",
  tagsTextHoverActive: "#ffffff",
  searchBackground: "#18191f",
  searchText: "#ffffff",
  searchPlaceHolder: "#575a77",
  playerBackground: "#18191f",
  titleColor: "#ffffff",
  timeColor: "#ffffff",
  progressSlider: "#1890ff",
  progressUsed: "#ffffff",
  progressLeft: "#151616",
  bufferLoaded: "#1f212b",
  volumeSlider: "#1890ff",
  volumeUsed: "#ffffff",
  volumeLeft: "#151616",
  playlistBackground: "#18191f",
  playlistText: "#575a77",
  playlistBackgroundHoverActive: "#18191f",
  playlistTextHoverActive: "#ffffff",
};

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
  const [walrusSongs, setWalrusSongs] = useState(cardData);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [audioSource, setAudioSource] = useState<string>(
    "path/to/your/audio/file.mp3"
  );

  const handleCardClick = (cardId: number, source: string) => {
    setSelectedCardId(cardId);
    setAudioSource(source);
  };

  const uploadProps: UploadProps = {
    name: "file",
    action: `${publisher}/v1/store?epochs=5`,
    method: "PUT",
    multiple: false,
    maxCount: 1,
    beforeUpload: (file) => {
      const isMP3orMP4 =
        file.type === "audio/mpeg" || file.type === "audio/mp4";
      if (!isMP3orMP4) {
        message.error(`${file.name} is not a mp3 or mp4 file`);
      }
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        message.error("Song must be smaller than 10MB!");
      }
      return isMP3orMP4 && isLt10M;
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} song uploaded successfully`);
        console.log("info", info);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} song upload failed.`);
      }
    },
  };

  return (
    <ConfigProvider theme={theme}>
      <div
        style={{
          width: "100%",
          padding: "2rem",
          maxWidth: "1200px",
          margin: "0 auto",
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
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Upload to Walrus</Button>
          </Upload>
          <Text
            style={{
              fontSize: "1.5rem",
              color: "#F5F5F5",
              marginBottom: "3rem",
            }}
          >
            Have a listen...
          </Text>

          <div style={{ width: "70%", maxHeight: "200px" }}>
            {" "}
            <Player
              trackList={walrusSongs}
              customColorScheme={colors}
              includeTags={false}
              includeSearch={false}
              showPlaylist={false}
            />
          </div>
        </div>

        <Row gutter={[16, 16]}>
          {walrusSongs.map((card) => (
            <Col xs={24} sm={12} md={8} lg={6} key={card.id}>
              <Card
                hoverable
                onClick={() => handleCardClick(card.id, card.url)}
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
                    src={GeoPattern.generate(card.title).toDataUri()}
                    style={{ height: "300px", width: "300px" }}
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
