"use client";

import React, { useEffect, useState } from "react";
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
  App,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
// import ReactAudioPlayer from "react-audio-player";
import Player from "@madzadev/audio-player";
import "@madzadev/audio-player/dist/index.css";
import { publisher, walrusRead } from "@/lib/walrus";
import GeoPattern from "geopattern";

const { Title, Text } = Typography;
const { Meta } = Card;

const backendURL = "https://dtunes-server.fly.dev";

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

const addSong = async (song: any, setWalrusSongs) => {
  const newSongs = await fetch(`${backendURL}/add`, {
    method: "POST",
    body: JSON.stringify(song),
    headers: {
      "Content-Type": "application/json",
    },
  });

  setWalrusSongs(newSongs);
  getSongs(setWalrusSongs);
};

export function DtunesHomepage() {
  const [walrusSongs, setWalrusSongs] = useState<any[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<number | null | string>(
    null
  );
  const [, setAudioSource] = useState<string>("path/to/your/audio/file.mp3");
  const [statusMessage, setStatusMessage] = useState(
    "🎵 Have a nice listen 🎵"
  );

  useEffect(() => {
    getSongs(setWalrusSongs);
  }, []);

  const handleCardClick = (cardId: number | string, source: string) => {
    setSelectedCardId(cardId);
    setAudioSource(source);
  };

  const createNewSong = ({
    bUrl,
    blobId,
    filename,
  }: {
    bUrl: string;
    blobId: string;
    filename: string;
  }) => {
    const newSong = {
      id: blobId,
      title: filename,
      description: "",
      tags: [],
    };

    addSong(newSong, setWalrusSongs);

    setStatusMessage("🎵 Have a nice listen 🎵");
  };

  const readFromWalrus = async (blobId: string, filename: string) => {
    setStatusMessage("🏗️ Downloading song from Walrus  🏗️");

    console.log("reading from blobId", blobId);
    const bUrl: any = await walrusRead(blobId);

    createNewSong({ bUrl, blobId, filename });
  };

  const uploadProps: UploadProps = {
    name: "file",
    action: `${publisher}/v1/store?epochs=5`,
    method: "PUT",
    multiple: false,
    maxCount: 1,
    beforeUpload: (file) => {
      console.log("Upload button engaged"); // Add this line to confirm engagement
      const isMP3orMP4 =
        file.type === "audio/mpeg" || file.type === "audio/mp4";
      if (!isMP3orMP4) {
        message.error(`${file.name} is not a mp3 or mp4 file`);
      }
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        message.error("Song must be smaller than 10MB!");
      }

      console.log("File type check:", isMP3orMP4);
      console.log("File size check:", isLt10M);

      setStatusMessage("🚀 Uploading song to Walrus  🚀");
      return isMP3orMP4 && isLt10M;
    },
    onChange(info) {
      console.log("Upload status:", info.file.status);
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} song uploaded successfully`);
        const blobId = info.file.response.newlyCreated.blobObject.blobId;
        readFromWalrus(blobId, info.file.name);
      } else if (info.file.status === "error") {
        message.error(
          `${info.file.name} song upload failed. It happens.. Try again!`
        );
        setStatusMessage("🎵 Have a nice listen 🎵");
      }
    },
  };

  return (
    <App>
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
              marginBottom: ".5rem",
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
            <Text
              style={{
                fontSize: "1.5rem",
                color: "#F5F5F5",
                marginBottom: "3rem",
              }}
            >
              {statusMessage}
            </Text>
            <Upload {...uploadProps}>
              <Button size="large" icon={<UploadOutlined />}>
                Upload an MP3 to Walrus
              </Button>
            </Upload>

            {walrusSongs && walrusSongs.length > 0 && (
              <div
                style={{ width: "70%", maxHeight: "200px", marginTop: "80px" }}
              >
                <Player
                  trackList={walrusSongs}
                  customColorScheme={colors}
                  includeTags={false}
                  includeSearch={false}
                  showPlaylist={false}
                />
              </div>
            )}
          </div>

          {walrusSongs && walrusSongs.length > 0 && (
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
                        </span>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>
      </ConfigProvider>
    </App>
  );
}
