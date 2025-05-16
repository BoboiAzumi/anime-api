import { Decryptor } from "./types";

export class DecryptorRegistry{
    decryptor: Map<string, Decryptor> = new Map<string, Decryptor>()

    register(name: string, decryptor: Decryptor): void{
        this.decryptor.set(name, decryptor)
    }

    getDecryptor(name: string): Decryptor | undefined{
        return this.decryptor.get(name)
    }

    hasDecryptor(name: string): boolean{
        return this.decryptor.has(name)
    }

    getDecryptorName(): string[] {
        return Array.from(this.decryptor.keys())
    }
}

export const decryptorRegistry = new DecryptorRegistry()