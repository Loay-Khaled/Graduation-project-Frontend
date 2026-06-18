import React from "react";
import { FiGithub, FiMail } from "react-icons/fi";

const About = () => {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-4xl">W</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            WiFi PenTest Device
          </h1>
          <p className="text-gray-400 text-lg">Version 1.0.0</p>
        </div>

        <div className="bg-dark-200 border border-gray-700 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            About the Project
          </h2>
          <p className="text-gray-300 mb-4">
            This is a Raspberry Pi-based portable Wi-Fi penetration testing
            device with dual artificial intelligence integration, designed
            exclusively for controlled laboratory environments to simulate and
            demonstrate wireless network vulnerabilities.
          </p>
          <p className="text-gray-300">
            The system features automated attack execution, intelligent
            vulnerability assessment, and autonomous exploitation capabilities,
            serving as an educational tool to highlight Wi-Fi security risks and
            promote best practices.
          </p>
        </div>

        <div className="bg-dark-200 border border-gray-700 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Academic Information
          </h2>
          <div className="space-y-2 text-gray-300">
            <p>
              <strong className="text-white">Institution:</strong> Arab Academy
              for Science, Technology and Maritime Transport (AAST)
            </p>
            <p>
              <strong className="text-white">Department:</strong> Computer
              Engineering
            </p>
            <p>
              <strong className="text-white">Supervisor:</strong> Dr. Mohamed
              Elhammahmy
            </p>
            <p>
              <strong className="text-white">Date:</strong> December 2025
            </p>
          </div>
        </div>

        <div className="bg-dark-200 border border-gray-700 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Technology Stack
          </h2>
          <div className="grid grid-cols-2 gap-4 text-gray-300">
            <div>
              <h3 className="text-white font-semibold mb-2">Frontend</h3>
              <ul className="space-y-1 text-sm">
                <li>• React.js 18</li>
                <li>• Tailwind CSS</li>
                <li>• Socket.io Client</li>
                <li>• Axios</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Backend</h3>
              <ul className="space-y-1 text-sm">
                <li>• Node.js & Express</li>
                <li>• MongoDB</li>
                <li>• Socket.io</li>
                <li>• Python (Attacks)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Hardware</h3>
              <ul className="space-y-1 text-sm">
                <li>• Raspberry Pi 4</li>
                <li>• Dual Wi-Fi Adapters</li>
                <li>• 7" Touchscreen</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">AI Components</h3>
              <ul className="space-y-1 text-sm">
                <li>• Local Transformer Model</li>
                <li>• Dolphin-Mistral 24B</li>
                <li>• OpenRouter API</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-yellow-900/20 border border-yellow-500 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">
            ⚠️ Ethical Notice
          </h2>
          <p className="text-yellow-200 mb-3">
            This tool is designed exclusively for controlled laboratory
            environments and authorized security testing.
          </p>
          <ul className="space-y-2 text-yellow-100 text-sm">
            <li>
              ✓ Use only on networks you own or have explicit permission to test
            </li>
            <li>✓ Record consent before any testing</li>
            <li>✓ Follow all applicable laws and regulations</li>
            <li>✗ Unauthorized access to networks is illegal</li>
            <li>✗ Misuse may result in criminal prosecution</li>
          </ul>
        </div>

        <div className="flex justify-center space-x-4">
          <a
            href="https://github.com/Loay-Khaled"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-6 py-3 bg-dark-200 border border-gray-700 hover:border-primary rounded-lg text-white transition-colors"
          >
            <FiGithub className="w-5 h-5" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
