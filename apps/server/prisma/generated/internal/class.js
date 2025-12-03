"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClientClass = getPrismaClientClass;
const runtime = __importStar(require("@prisma/client/runtime/client"));
const config = {
    "previewFeatures": [],
    "clientVersion": "7.0.0",
    "engineVersion": "0c19ccc313cf9911a90d99d2ac2eb0280c76c513",
    "activeProvider": "postgresql",
    "inlineSchema": "generator client {\n  provider = \"prisma-client\"\n  output   = \"./generated\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n}\n\nmodel MedicalProduct {\n  code          Int            @id @default(autoincrement())\n  name          String         @unique\n  productLimits ProductLimit[]\n  customers     Customer[]\n  productRates  ProductRate[]\n}\n\nmodel ProductLimit {\n  code               Int             @id @default(autoincrement())\n  name               String\n  limit              Int\n  rate               Int\n  active             Boolean         @default(true)\n  medicalProduct     MedicalProduct? @relation(fields: [medicalProductCode], references: [code])\n  medicalProductCode Int?\n\n  @@unique([medicalProductCode, name])\n}\n\nmodel ProductRate {\n  code        Int            @id @default(autoincrement())\n  product     MedicalProduct @relation(fields: [productCode], references: [code])\n  productCode Int\n  familySize  Int\n  sharing     Sharing\n\n  @@unique([productCode, familySize, sharing])\n}\n\nenum Sharing {\n  PF\n  PP\n}\n\nmodel Customer {\n  code         Int                 @id @default(autoincrement())\n  fullName     String\n  mobileNumber String\n  idNumber     String\n  dob          String\n  famSize      Int\n  premium      Float\n  product      MedicalProduct      @relation(fields: [productCode], references: [code])\n  productCode  Int\n  dependants   CustomerDependant[]\n}\n\nmodel CustomerDependant {\n  code         Int          @id @default(autoincrement())\n  fullName     String\n  dob          String\n  relationship Relationship\n  customer     Customer?    @relation(fields: [customerCode], references: [code])\n  customerCode Int?\n\n  @@unique([customerCode, fullName, dob])\n}\n\nenum Relationship {\n  SP\n  CH\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"MedicalProduct\":{\"fields\":[{\"name\":\"code\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"productLimits\",\"kind\":\"object\",\"type\":\"ProductLimit\",\"relationName\":\"MedicalProductToProductLimit\"},{\"name\":\"customers\",\"kind\":\"object\",\"type\":\"Customer\",\"relationName\":\"CustomerToMedicalProduct\"},{\"name\":\"productRates\",\"kind\":\"object\",\"type\":\"ProductRate\",\"relationName\":\"MedicalProductToProductRate\"}],\"dbName\":null},\"ProductLimit\":{\"fields\":[{\"name\":\"code\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"limit\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"rate\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"active\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"medicalProduct\",\"kind\":\"object\",\"type\":\"MedicalProduct\",\"relationName\":\"MedicalProductToProductLimit\"},{\"name\":\"medicalProductCode\",\"kind\":\"scalar\",\"type\":\"Int\"}],\"dbName\":null},\"ProductRate\":{\"fields\":[{\"name\":\"code\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"product\",\"kind\":\"object\",\"type\":\"MedicalProduct\",\"relationName\":\"MedicalProductToProductRate\"},{\"name\":\"productCode\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"familySize\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"sharing\",\"kind\":\"enum\",\"type\":\"Sharing\"}],\"dbName\":null},\"Customer\":{\"fields\":[{\"name\":\"code\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"fullName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"mobileNumber\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"idNumber\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"dob\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"famSize\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"premium\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"product\",\"kind\":\"object\",\"type\":\"MedicalProduct\",\"relationName\":\"CustomerToMedicalProduct\"},{\"name\":\"productCode\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"dependants\",\"kind\":\"object\",\"type\":\"CustomerDependant\",\"relationName\":\"CustomerToCustomerDependant\"}],\"dbName\":null},\"CustomerDependant\":{\"fields\":[{\"name\":\"code\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"fullName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"dob\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"relationship\",\"kind\":\"enum\",\"type\":\"Relationship\"},{\"name\":\"customer\",\"kind\":\"object\",\"type\":\"Customer\",\"relationName\":\"CustomerToCustomerDependant\"},{\"name\":\"customerCode\",\"kind\":\"scalar\",\"type\":\"Int\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}");
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await Promise.resolve().then(() => __importStar(require('node:buffer')));
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async () => await Promise.resolve().then(() => __importStar(require("@prisma/client/runtime/query_compiler_bg.postgresql.mjs"))),
    getQueryCompilerWasmModule: async () => {
        const { wasm } = await Promise.resolve().then(() => __importStar(require("@prisma/client/runtime/query_compiler_bg.postgresql.wasm-base64.mjs")));
        return await decodeBase64AsWasm(wasm);
    }
};
function getPrismaClientClass() {
    return runtime.getPrismaClient(config);
}
