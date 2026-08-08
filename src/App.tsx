import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { SidebarTab } from './types/dashboard';
import { AiStatusCard } from './components/dashboard/AiStatusCard';
import { CreatorOverview } from './components/dashboard/CreatorOverview';
import { AnalyticsCards } from './components/dashboard/AnalyticsCards';
import { WorkflowTimeline } from './components/dashboard/WorkflowTimeline';
import { RecentProjects } from './components/dashboard/RecentProjects';
import { ActivityFeed } from './components/dashboard/ActivityFeed';
import { ModuleView } from './components/views/ModuleView';
import { CreatorProvider } from './context/CreatorContext';

export default function App() {
  const [activeTab, setActiveTab] = useState<SidebarTab>('dashboard');
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <CreatorProvider>
      <div className="min-h-screen bg-[#0F0F0F] text-[#F1F1F1] font-sans antialiased selection:bg-red-600 selection:text-white flex flex-col">
        {/* Sticky Top Header */}
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Main Body Layout: Sidebar + Main Content */}
        <div className="flex flex-1 relative">
          {/* Sidebar Navigation */}
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />

          {/* Main Content Area */}
          <main className="flex-1 p-4 lg:p-8 max-w-[1800px] w-full mx-auto space-y-8 overflow-y-auto">
            <div key={activeTab} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              {activeTab === 'dashboard' ? (
                <div className="space-y-8">
                  {/* 1. AI Status Card */}
                  <section id="ai-status">
                    <AiStatusCard />
                  </section>

                  {/* 2. Creator Overview */}
                  <section id="creator-overview">
                    <CreatorOverview />
                  </section>

                  {/* 3. Analytics Cards */}
                  <section id="analytics-cards">
                    <AnalyticsCards />
                  </section>

                  {/* 4. Workflow Timeline */}
                  <section id="workflow-timeline">
                    <WorkflowTimeline />
                  </section>

                  {/* 5. Recent Projects */}
                  <section id="recent-projects">
                    <RecentProjects />
                  </section>

                  {/* 6. Activity Feed */}
                  <section id="activity-feed">
                    <ActivityFeed />
                  </section>
                </div>
              ) : (
                /* Sub-module Views */
                <ModuleView
                  tab={activeTab}
                  onBackToDashboard={() => setActiveTab('dashboard')}
                />
              )}
            </div>
          </main>
        </div>
      </div>
    </CreatorProvider>
  );
}
