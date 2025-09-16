"use client"

import { useEffect, useState } from "react"
import { Cookie, Shield, BarChart3, Zap, Settings } from "lucide-react"

const STORAGE_KEY = "cookieConsent"

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof window === "undefined") return

    const timer = setTimeout(() => {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (!saved) {
        setVisible(true)
      }
      setLoading(false)
    }, 2500) // 2.5 second delay

    return () => clearTimeout(timer)
  }, [])

  const saveChoice = (value) => {
    try {
      localStorage.setItem(STORAGE_KEY, value)
    } catch {}
    setVisible(false)
  }

  const handleAccept = () => {
    saveChoice("accepted")
  }

  const handleDecline = () => {
    saveChoice("declined")
  }

  if (loading || !visible) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 pointer-events-none transition-opacity duration-500" />

      <div className="fixed bottom-0 inset-x-0 z-50 animate-in slide-in-from-bottom-4 duration-700 ease-out">
        <div className="mx-auto mb-4 w-[90%]">
          <div className="relative overflow-hidden rounded-t-2xl bg-white/90 backdrop-blur-2xl border-t border-gray-200/50 shadow-xl shadow-black/20">
            {/* 🔥 Top gradient bar changed to red→blue */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-500 via-pink-500 to-blue-900 animate-pulse" />

            <div className="p-4 lg:p-6">
              <div className="flex flex-col lg:flex-row lg:items-start gap-4 mx-auto">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    {/* 🔥 Cookie icon circle with red→blue gradient */}
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-blue-800 text-white shadow-md">
                      <Cookie className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 tracking-tight">
                        Cookie Preferences
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Tailor your experience
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-0 text-sm max-w-full">
                    We use cookies to enhance your experience and analyze performance. Accept All to agree or read our{" "}
                    <a
                      href="/privacy-policy"
                      className="font-medium text-blue-600 hover:text-blue-800 underline underline-offset-2 transition-colors duration-200"
                    >
                      Privacy Policy
                    </a>.
                  </p>

                  {expanded && (
                    <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="rounded-xl bg-gradient-to-br from-gray-50 to-blue-50/70 border border-gray-200/70 p-4 shadow-sm">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-1.5 text-base">
                          <Settings className="h-4 w-4" />
                          Cookie Categories
                        </h4>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="flex gap-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-100 text-green-600 shadow-sm">
                              <Shield className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 text-xs">Essential</p>
                              <p className="text-xs text-gray-600">Core functionality</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-600 shadow-sm">
                              <BarChart3 className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 text-xs">Analytics</p>
                              <p className="text-xs text-gray-600">Service improvement</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-100 text-purple-600 shadow-sm">
                              <Zap className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 text-xs">Performance</p>
                              <p className="text-xs text-gray-600">Faster load times</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-100 text-orange-600 shadow-sm">
                              <Settings className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 text-xs">Functional</p>
                              <p className="text-xs text-gray-600">User preferences</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-row gap-2 lg:min-w-[360px]">
                  <button
                    onClick={() => setExpanded((e) => !e)}
                    className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 hover:border-gray-300 transition-all duration-300 text-xs font-semibold shadow-sm hover:shadow-md"
                  >
                    <Settings className="h-3 w-3 inline mr-1" />
                    {expanded ? "Hide" : "Customize"}
                  </button>
                  <button
                    onClick={handleDecline}
                    className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-gray-800 hover:bg-gray-100 hover:border-gray-400 transition-all duration-300 text-xs font-semibold shadow-sm hover:shadow-md"
                  >
                    Decline
                  </button>
                  {/* 🔥 Accept All button with red→blue gradient */}
                  <button
                    onClick={handleAccept}
                    className="flex-1 px-3 py-2 rounded-lg bg-gradient-to-r from-red-500 to-blue-900 text-white hover:from-red-600 hover:to-blue-800 transition-all duration-300 text-xs font-semibold shadow-md hover:shadow-lg"
                  >
                    Accept All
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
