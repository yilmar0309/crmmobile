# CRM Mobile App

## Description

Welcome to the **CRM Mobile** application. This app is built with [React Native](https://reactnative.dev/) and is designed to run on both Android and iOS devices. This document will guide you through the process of setting up and running the application on your local machine.

---

## Prerequisites

Before starting, ensure you have the following tools installed:

- **Operating System**:
  - **macOS**: Required for iOS development.
  - **Windows/Linux**: Can be used for Android development.

- **Node.js**: Version **18** or higher.
  - Download and install from the [official Node.js website](https://nodejs.org/).

- **Yarn**: Version **3.6.4**.
  - Install globally using:

    ```bash
    npm install -g yarn
    ```

- **React Native CLI**:
  - Install globally using:

    ```bash
    npm install -g react-native-cli
    ```

- **Java Development Kit (JDK)**: Version **11** or higher.
  - Download and install from [AdoptOpenJDK](https://adoptopenjdk.net/).

- **Android Studio**:
  - Download and install from the [Android Studio website](https://developer.android.com/studio).
  - **Android SDK**: Ensure you have the latest SDK tools and platform tools.
  - **Environment Variables**:
    - Set `ANDROID_HOME` to point to your Android SDK directory.
    - Add `$ANDROID_HOME/emulator`, `$ANDROID_HOME/tools`, `$ANDROID_HOME/tools/bin`, and `$ANDROID_HOME/platform-tools` to your `PATH`.

- **Xcode** (macOS only):
  - Download and install from the [App Store](https://apps.apple.com/us/app/xcode/id497799835).
  - **Command Line Tools**: Install via Xcode > Preferences > Locations.

- **CocoaPods** (macOS only):
  - Install using:

    ```bash
    sudo gem install cocoapods
    ```

- **Environment Files**:
  - Create `.env.development` and `.env.production` files in the root directory.

---

# Getting Started

## Step 1: Install dependencies

```bash
yarn install
```

## Step 2: Install pods
```bash
npx pod-install ios
```

## Step 3: Run application

### For Android

bin/run-ios -<Schema: (Environment)> (d: Development, p: Production)

```bash
bin/run-ios -d
```

### For iOS

```bash
bin/run-ios -d
```
