"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Building2, Search, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SearchLoadingPage() {
  const router = useRouter()

  const handleBackToHome = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Building2 className="h-16 w-16 text-primary" />
              <h1 className="text-4xl font-bold text-foreground">マンション投資検索</h1>
            </div>
            <h2 className="text-3xl font-semibold text-foreground mb-4">検索中です</h2>
            <p className="text-lg text-muted-foreground mb-8">
              ご指定の条件に合う投資物件を検索しています。
              <br />
              処理には時間がかかりますので、しばらくお待ちください。
            </p>
          </div>

          {/* メインローディングカード */}
          <Card className="mb-8">
            <CardContent className="p-12">
              <div className="flex items-center justify-center mb-8">
                <Search className="h-24 w-24 text-primary animate-pulse" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
                </div>
                <p className="text-xl font-medium text-foreground">物件データを検索しています</p>
                <p className="text-muted-foreground">検索完了まで数分かかる場合があります</p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Button onClick={handleBackToHome} variant="outline" size="lg" className="w-full max-w-md bg-transparent">
              <ArrowLeft className="h-4 w-4 mr-2" />
              ホームに戻る
            </Button>

            <p className="text-sm text-muted-foreground">検索は継続されます。後ほど結果をご確認ください。</p>
          </div>
          {/* </CHANGE> */}
        </div>
      </div>
    </div>
  )
}
