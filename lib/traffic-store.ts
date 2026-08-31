import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { TrafficVisit } from "@/components/traffic-tracker";

const storeDirectory = path.join(process.cwd(), ".data");
const storeFile = path.join(storeDirectory, "traffic.json");

export async function readTraffic(): Promise<TrafficVisit[]> {
  try {
    return JSON.parse(await readFile(storeFile, "utf8")) as TrafficVisit[];
  } catch {
    return [];
  }
}

export async function writeTraffic(visits: TrafficVisit[]) {
  await mkdir(storeDirectory, { recursive: true });
  await writeFile(storeFile, JSON.stringify(visits.slice(0, 500), null, 2), "utf8");
}

