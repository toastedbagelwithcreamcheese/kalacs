import HomeClient from "./HomeClient";

/**
 * A főoldal szerver-burkolója.
 *
 * Miért kell: a tényleges főoldal `"use client"`, egy kliens-komponens pedig nem
 * exportálhat `metadata`-t. Emiatt korábban a (foto)/layout.js adta neki a
 * `canonical: "/"` értéket — ami viszont MINDEN olyan lapra átszivárgott, amelyik
 * nem írta felül. Így a /about és a /portfolio is a főoldalt jelölte meg
 * kanonikusnak, vagyis azt kérte a Google-tól, hogy ne indexelje őket önállóan.
 * Ez a burkoló adja a főoldalnak a sajátját, a layout pedig már nem szab meg
 * globális canonicalt — egy új oldal így legrosszabb esetben canonical nélkül
 * marad, amit a Google önhivatkozóként kezel. Ez a biztonságos alapértelmezés.
 */
export const metadata = {
  alternates: { canonical: "/" },
};

export default function Page() {
  return <HomeClient />;
}
