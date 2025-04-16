"use client";

import {
  Home as HomeIcon,
  Search,
  Library,
  ChevronLeft,
  ChevronRight,
  Play,
} from "lucide-react";
import { api, token } from "@/services/api";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [playlist, setPlaylist] = useState() as any;

  const getPlaylist = async () => {
    const tokenUser = await token.then((res) => {
      setLoading(true);
      return res;
    });
    const response = await api
      .get("/v1/users/21sr34se72fr6osxl6tbjw3fy/playlists", {
        headers: {
          Authorization: `Bearer ${tokenUser}`,
        },
      })
      .then((res) => {
        return res.data;
      });

    return response;
  };

  const handlePlaylist = useCallback(async () => {
    const response = await getPlaylist();
    setLoading(false);
    setPlaylist(response);
  }, []);

  useEffect(() => {
    handlePlaylist();
  }, [handlePlaylist]);

  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1">
        <aside className="w-72 bg-zinc-950 p-6">
          <nav className="flex-col font-semibold text-xs space-y-4 text-zinc-200">
            <a href="#" className="flex gap-2 items-center">
              <HomeIcon />
              Início
            </a>
            <a href="#" className="flex gap-2 items-center">
              <Search />
              Buscar
            </a>
            <a href="#" className="flex gap-2 items-center">
              <Library />
              Sua Biblioteca
            </a>
          </nav>

          <nav className="mt-6 pt-6 border-t border-t-zinc-800 flex flex-col gap-3">
            {loading ? (
              <p>Carregando...</p>
            ) : (
              playlist?.items.map((item: any) => (
                <a
                  key={item.name}
                  href="#"
                  className="text-sm text-zinc-400 hover:text-zinc-100"
                >
                  {item.name}
                </a>
              ))
            )}
          </nav>
        </aside>
        <main className="flex-1 p-6">
          <div className="flex items-center gap-4">
            <button className="p-1 rounded-full bg-black/40">
              <ChevronLeft />
            </button>
            <button className="p-1 rounded-full bg-black/40">
              <ChevronRight />
            </button>
          </div>

          <h1 className="font-semibold text-4xl mt-10">Good Afternoon</h1>

          <div className="grid grid-cols-3 gap-6 mt-5">
            {loading ? (
              <p>Carregando...</p>
            ) : (
              playlist?.items.map((item: any) => (
                <a
                  href="#"
                  key={item.name}
                  className="bg-white/5 hover:bg-white/10 rounded flex items-center gap-3 overflow-hidden group"
                >
                  <img
                    src={item.images[0].url}
                    alt="Imagens de capas das playlists"
                    style={{ width: "104px", height: "104px" }}
                  />
                  <strong>{item.name}</strong>
                  <button className="bg-green-400 rounded-full p-2 text-black ml-auto mr-8 w-10 h-10 invisible group-hover:visible">
                    <Play fill="black" />
                  </button>
                </a>
              ))
            )}
          </div>
        </main>
      </div>
      <footer className="bg-zinc-800 border-t border-zinc-700 p-6">
        Footer
      </footer>
    </div>
  );
}
