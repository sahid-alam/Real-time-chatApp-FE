# Real Time Chat Application - Frontend

A React TypeScript frontend for a real-time chat application with WebSocket integration.

## Features

- **Dark Theme**: Professional dark interface with clean design
- **Real-time Messaging**: WebSocket-based instant messaging
- **Room Management**: Create and join temporary chat rooms
- **Responsive Design**: Works on desktop and mobile devices
- **Connection Status**: Visual indicators for connection state
- **Auto-scroll**: Messages automatically scroll to bottom
- **Form Validation**: Input validation for room codes and usernames

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- WebSocket API

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## Usage

1. **Create a Room**: Click "Create New Room" to generate a random 6-character room code
2. **Join a Room**: Enter an existing room code and your name
3. **Chat**: Send messages in real-time with other users in the same room
4. **Leave Room**: Click "Leave Room" to disconnect and return to the landing page

## WebSocket Integration

The application connects to `ws://localhost:8080` and handles:

- **Join Messages**: `{ type: "join", room: string, name: string }`
- **Chat Messages**: `{ type: "chat", text: string }`
- **System Messages**: `{ type: "info|error", message: string }`

## Project Structure

```
src/
├── components/          # React components
│   ├── LandingPage.tsx
│   ├── ChatInterface.tsx
│   ├── ChatHeader.tsx
│   ├── MessageList.tsx
│   ├── MessageItem.tsx
│   └── ChatInput.tsx
├── types/              # TypeScript interfaces
│   └── chat.ts
├── utils/              # Utility functions
│   ├── websocket.ts
│   └── roomUtils.ts
├── App.tsx             # Main application component
├── index.tsx           # Application entry point
└── index.css           # Global styles with Tailwind
```

## Features in Detail

### Landing Page
- Clean, minimalist design with dark theme
- Room creation with random code generation
- Room joining with validation
- User name input with validation

### Chat Interface
- Real-time message display
- Connection status indicator
- Message input with send functionality
- Auto-scroll to latest messages
- Different message styles for own/other/system messages

### WebSocket Features
- Automatic reconnection on disconnect
- Connection status management
- Message parsing and validation
- Error handling

## Styling

The application uses Tailwind CSS with custom dark theme colors:
- Background: Dark grays and blacks
- Accent: Blue for interactive elements
- Text: White and gray variations
- Status indicators: Green (connected), Yellow (connecting), Red (error)

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Development

The application is built with modern React patterns:
- Functional components with hooks
- TypeScript for type safety
- Custom hooks for WebSocket management
- Responsive design with Tailwind CSS 