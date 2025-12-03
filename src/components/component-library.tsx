import React, { useState } from 'react';

import { ETASButtonEnhanced } from './etas-button-enhanced';
import { ChatBubbleEnhanced } from './chat-bubble-enhanced';
import { ETASCard } from './etas-card';
import { ETASAvatar } from './etas-avatar';
import { MetricCard } from './metric-card';
import { AnimationPlaceholder } from './animation-placeholder';
import { ETASFooter } from './etas-footer';
import { SectionContainer } from './section-container';
import { Sparkles, ArrowLeft } from 'lucide-react';

interface ComponentLibraryProps {
  onNavigate: (screen: string) => void;
}

export const ComponentLibrary: React.FC<ComponentLibraryProps> = ({ onNavigate }) => {
  const [buttonState, setButtonState] = useState<'default' | 'hover' | 'pressed' | 'disabled'>('default');

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">

      
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1440px] mx-auto p-8 space-y-12">
          {/* Back Button */}
          <ETASButtonEnhanced
            variant="ghost"
            icon={<ArrowLeft className="w-5 h-5" />}
            onClick={() => onNavigate('welcome')}
          >
            Back to Welcome
          </ETASButtonEnhanced>

          {/* Design Tokens */}
          <section>
            <h2 className="mb-6 text-[#164293]">Design Tokens</h2>
            
            {/* Color Palette */}
            <div className="mb-8">
              <h3 className="mb-4 text-[#5A646E]">Color Palette</h3>
              <div className="grid grid-cols-5 gap-4">
                <div>
                  <div className="w-full h-24 bg-[#FAFAFA] border border-gray-200 rounded-lg mb-2"></div>
                  <p className="text-sm">surface-50</p>
                  <p className="text-xs text-gray-500">#FAFAFA</p>
                </div>
                <div>
                  <div className="w-full h-24 bg-[#5A646E] rounded-lg mb-2"></div>
                  <p className="text-sm">gray-900</p>
                  <p className="text-xs text-gray-500">#5A646E</p>
                </div>
                <div>
                  <div className="w-full h-24 bg-[#164293] rounded-lg mb-2"></div>
                  <p className="text-sm">etas-blue-900</p>
                  <p className="text-xs text-gray-500">#164293</p>
                </div>
                <div>
                  <div className="w-full h-24 bg-[#89037A] rounded-lg mb-2"></div>
                  <p className="text-sm">purple-900</p>
                  <p className="text-xs text-gray-500">#89037A</p>
                </div>
                <div>
                  <div className="w-full h-24 gradient-etas rounded-lg mb-2"></div>
                  <p className="text-sm">gradient</p>
                  <p className="text-xs text-gray-500">L→R</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <div className="w-full h-16 bg-[#039C7D] rounded-lg mb-2"></div>
                  <p className="text-sm">success</p>
                  <p className="text-xs text-gray-500">#039C7D</p>
                </div>
                <div>
                  <div className="w-full h-16 bg-[#E5004A] rounded-lg mb-2"></div>
                  <p className="text-sm">error</p>
                  <p className="text-xs text-gray-500">#E5004A</p>
                </div>
                <div>
                  <div className="w-full h-16 bg-[#FCCD22] rounded-lg mb-2"></div>
                  <p className="text-sm">warning</p>
                  <p className="text-xs text-gray-500">#FCCD22</p>
                </div>
              </div>
            </div>

            {/* Typography */}
            <div>
              <h3 className="mb-4 text-[#5A646E]">Typography - Manrope</h3>
              <div className="space-y-4 bg-white p-6 rounded-lg border border-gray-200">
                <div>
                  <p className="text-[32px] leading-[40px]">text-2xl-semibold (32/40)</p>
                  <p className="text-sm text-gray-500">32px / 40px line-height / weight 600</p>
                </div>
                <div>
                  <p className="text-[24px] leading-[32px]">text-xl-semibold (24/32)</p>
                  <p className="text-sm text-gray-500">24px / 32px line-height / weight 600</p>
                </div>
                <div>
                  <p className="text-[20px] leading-[28px]">text-l-semibold (20/28)</p>
                  <p className="text-sm text-gray-500">20px / 28px line-height / weight 600</p>
                </div>
                <div>
                  <p className="text-[16px] leading-[24px]">text-m-regular (16/24)</p>
                  <p className="text-sm text-gray-500">16px / 24px line-height / weight 400</p>
                </div>
                <div>
                  <p className="font-mono text-sm">Fira Mono 14px - Code blocks</p>
                  <p className="text-sm text-gray-500">14px / weight 400</p>
                </div>
              </div>
            </div>
          </section>

          {/* Buttons */}
          <section>
            <h2 className="mb-6 text-[#164293]">Buttons</h2>
            
            <div className="space-y-6 bg-white p-8 rounded-lg border border-gray-200">
              <div>
                <p className="mb-3 text-sm text-gray-600">Primary (Gradient)</p>
                <div className="flex gap-4 flex-wrap">
                  <ETASButtonEnhanced variant="primary" state="default" icon={<Sparkles className="w-5 h-5" />}>
                    Default
                  </ETASButtonEnhanced>
                  <ETASButtonEnhanced variant="primary" state="hover" icon={<Sparkles className="w-5 h-5" />}>
                    Hover
                  </ETASButtonEnhanced>
                  <ETASButtonEnhanced variant="primary" state="pressed" icon={<Sparkles className="w-5 h-5" />}>
                    Pressed
                  </ETASButtonEnhanced>
                  <ETASButtonEnhanced variant="primary" state="disabled" icon={<Sparkles className="w-5 h-5" />} disabled>
                    Disabled
                  </ETASButtonEnhanced>
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm text-gray-600">Secondary (Outline)</p>
                <div className="flex gap-4 flex-wrap">
                  <ETASButtonEnhanced variant="secondary" state="default">
                    Default
                  </ETASButtonEnhanced>
                  <ETASButtonEnhanced variant="secondary" state="hover">
                    Hover
                  </ETASButtonEnhanced>
                  <ETASButtonEnhanced variant="secondary" state="pressed">
                    Pressed
                  </ETASButtonEnhanced>
                  <ETASButtonEnhanced variant="secondary" state="disabled" disabled>
                    Disabled
                  </ETASButtonEnhanced>
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm text-gray-600">Ghost</p>
                <div className="flex gap-4 flex-wrap">
                  <ETASButtonEnhanced variant="ghost" state="default">
                    Default
                  </ETASButtonEnhanced>
                  <ETASButtonEnhanced variant="ghost" state="hover">
                    Hover
                  </ETASButtonEnhanced>
                  <ETASButtonEnhanced variant="ghost" state="pressed">
                    Pressed
                  </ETASButtonEnhanced>
                  <ETASButtonEnhanced variant="ghost" state="disabled" disabled>
                    Disabled
                  </ETASButtonEnhanced>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Focus state: 2px ring, #007BC2 (medium-blue-900) | Contrast ratio: ≥4.5:1
                </p>
              </div>
            </div>
          </section>

          {/* Avatars */}
          <section>
            <h2 className="mb-6 text-[#164293]">Avatars</h2>
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <div className="flex gap-8 items-center mb-6">
                <div className="text-center">
                  <ETASAvatar type="welcome" size={48} className="mb-2 mx-auto" />
                  <p className="text-sm">Welcome Agent</p>
                  <p className="text-xs text-gray-500">48px</p>
                </div>
                <div className="text-center">
                  <ETASAvatar type="calibration" size={48} className="mb-2 mx-auto" />
                  <p className="text-sm">Calibration</p>
                  <p className="text-xs text-gray-500">48px</p>
                </div>
                <div className="text-center">
                  <ETASAvatar type="swdev" size={48} className="mb-2 mx-auto" />
                  <p className="text-sm">SW Dev</p>
                  <p className="text-xs text-gray-500">48px</p>
                </div>
                <div className="text-center">
                  <ETASAvatar type="aura" size={48} className="mb-2 mx-auto" />
                  <p className="text-sm">AURA</p>
                  <p className="text-xs text-gray-500">48px</p>
                </div>
              </div>
              
              <div className="flex gap-8 items-center pt-6 border-t border-gray-200">
                <div className="text-center">
                  <ETASAvatar type="welcome" size={64} className="mb-2 mx-auto" />
                  <p className="text-sm">Welcome Agent</p>
                  <p className="text-xs text-gray-500">64px</p>
                </div>
                <div className="text-center">
                  <ETASAvatar type="calibration" size={64} className="mb-2 mx-auto" />
                  <p className="text-sm">Calibration</p>
                  <p className="text-xs text-gray-500">64px</p>
                </div>
                <div className="text-center">
                  <ETASAvatar type="swdev" size={64} className="mb-2 mx-auto" />
                  <p className="text-sm">SW Dev</p>
                  <p className="text-xs text-gray-500">64px</p>
                </div>
                <div className="text-center">
                  <ETASAvatar type="aura" size={64} className="mb-2 mx-auto" />
                  <p className="text-sm">AURA</p>
                  <p className="text-xs text-gray-500">64px</p>
                </div>
              </div>
            </div>
          </section>

          {/* Chat Bubbles */}
          <section>
            <h2 className="mb-6 text-[#164293]">Chat Bubbles</h2>
            <div className="bg-white p-8 rounded-lg border border-gray-200 space-y-6">
              <div>
                <p className="mb-3 text-sm text-gray-600">Agent Variants</p>
                <div className="space-y-4">
                  <ChatBubbleEnhanced 
                    type="agent" 
                    agentType="welcome"
                    message="Welcome Agent message with avatar" 
                    showAvatar={true}
                  />
                  <ChatBubbleEnhanced 
                    type="agent" 
                    agentType="calibration"
                    message="Calibration Agent message" 
                    showAvatar={true}
                  />
                  <ChatBubbleEnhanced 
                    type="agent" 
                    agentType="aura"
                    message="AURA Agent message with timestamp" 
                    showAvatar={true}
                    showTimestamp={true}
                    timestamp="10:34 AM"
                  />
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm text-gray-600">User Bubble</p>
                <ChatBubbleEnhanced 
                  type="user" 
                  message="User message example" 
                  showAvatar={true}
                />
              </div>

              <div>
                <p className="mb-3 text-sm text-gray-600">Without Avatar</p>
                <ChatBubbleEnhanced 
                  type="agent" 
                  message="Agent message without avatar" 
                  showAvatar={false}
                />
              </div>
            </div>
          </section>

          {/* Cards */}
          <section>
            <h2 className="mb-6 text-[#164293]">Cards</h2>
            <div className="space-y-6">
              <div>
                <p className="mb-3 text-sm text-gray-600">Size M (640px)</p>
                <ETASCard 
                  size="M"
                  header={<h3 className="text-[#164293]">Card Header</h3>}
                >
                  <p className="text-[#5A646E]">
                    This is a Medium card component with a header section and content area.
                    Perfect for smaller content blocks and side panels.
                  </p>
                </ETASCard>
              </div>

              <div>
                <p className="mb-3 text-sm text-gray-600">Size L (960px)</p>
                <ETASCard 
                  size="L"
                  header={<h3 className="text-[#164293]">Large Card Header</h3>}
                >
                  <p className="text-[#5A646E]">
                    This is a Large card component ideal for main content areas, dashboards, and detailed information displays.
                    The larger width accommodates more complex layouts and multiple columns.
                  </p>
                </ETASCard>
              </div>
            </div>
          </section>

          {/* Metric Cards */}
          <section>
            <h2 className="mb-6 text-[#164293]">Metric Cards</h2>
            <div className="grid grid-cols-3 gap-6">
              <MetricCard
                title="Total Calibrations"
                value="1,247"
                delta={12.5}
                deltaLabel="vs last month"
                signal="success"
              />
              <MetricCard
                title="Active Sessions"
                value="34"
                delta={-5.2}
                deltaLabel="vs yesterday"
                signal="error"
              />
              <MetricCard
                title="Processing Time"
                value="2.4s"
                delta={8.1}
                deltaLabel="slower"
                signal="warning"
              />
            </div>
          </section>

          {/* Animation Placeholder */}
          <section>
            <h2 className="mb-6 text-[#164293]">Animation Placeholder</h2>
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <p className="mb-4 text-sm text-gray-600">960×540px - Label override via prop</p>
              <AnimationPlaceholder 
                label="CUSTOM_ANIMATION_LABEL"
                width={960}
                height={540}
              />
              <p className="mt-4 text-xs text-gray-500">
                Note: This placeholder is designed for future Lottie animations or video content swaps.
              </p>
            </div>
          </section>
        </div>
      </div>

      <ETASFooter />
    </div>
  );
};
