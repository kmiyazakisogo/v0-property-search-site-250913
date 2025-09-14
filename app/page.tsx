"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Building2, Search, Download, Clock, MapPin, DollarSign } from "lucide-react"

const searchHistory = [
  {
    id: 1,
    searchTime: "2024-01-15 14:30",
    area: "東京都 - 新宿区",
    priceRange: "3,000万円〜5,000万円",
    status: "完了",
    resultCount: 12,
  },
  {
    id: 2,
    searchTime: "2024-01-15 13:45",
    area: "東京都 - 渋谷区",
    priceRange: "5,000万円〜7,000万円",
    status: "完了",
    resultCount: 8,
  },
  {
    id: 3,
    searchTime: "2024-01-15 12:20",
    area: "東京都 - 港区",
    priceRange: "7,000万円〜1億円",
    status: "検索中",
    resultCount: null,
  },
  {
    id: 4,
    searchTime: "2024-01-14 16:15",
    area: "神奈川県 - 横浜市",
    priceRange: "指定なし",
    status: "完了",
    resultCount: 25,
  },
]

const prefectures = [
  { value: "tokyo", label: "東京都" },
  { value: "kanagawa", label: "神奈川県" },
  { value: "chiba", label: "千葉県" },
  { value: "saitama", label: "埼玉県" },
  { value: "osaka", label: "大阪府" },
  { value: "kyoto", label: "京都府" },
  { value: "hyogo", label: "兵庫県" },
  { value: "aichi", label: "愛知県" },
]

const cities: Record<string, { value: string; label: string }[]> = {
  tokyo: [
    { value: "shinjuku", label: "新宿区" },
    { value: "shibuya", label: "渋谷区" },
    { value: "minato", label: "港区" },
    { value: "chuo", label: "中央区" },
    { value: "chiyoda", label: "千代田区" },
    { value: "shinagawa", label: "品川区" },
    { value: "meguro", label: "目黒区" },
    { value: "setagaya", label: "世田谷区" },
    { value: "suginami", label: "杉並区" },
    { value: "toshima", label: "豊島区" },
  ],
  kanagawa: [
    { value: "yokohama", label: "横浜市" },
    { value: "kawasaki", label: "川崎市" },
    { value: "sagamihara", label: "相模原市" },
    { value: "fujisawa", label: "藤沢市" },
    { value: "chigasaki", label: "茅ヶ崎市" },
  ],
  chiba: [
    { value: "chiba-city", label: "千葉市" },
    { value: "funabashi", label: "船橋市" },
    { value: "matsudo", label: "松戸市" },
    { value: "ichikawa", label: "市川市" },
    { value: "kashiwa", label: "柏市" },
  ],
  saitama: [
    { value: "saitama-city", label: "さいたま市" },
    { value: "kawaguchi", label: "川口市" },
    { value: "tokorozawa", label: "所沢市" },
    { value: "kawagoe", label: "川越市" },
    { value: "koshigaya", label: "越谷市" },
  ],
  osaka: [
    { value: "osaka-city", label: "大阪市" },
    { value: "sakai", label: "堺市" },
    { value: "higashiosaka", label: "東大阪市" },
    { value: "toyonaka", label: "豊中市" },
    { value: "suita", label: "吹田市" },
  ],
  kyoto: [
    { value: "kyoto-city", label: "京都市" },
    { value: "uji", label: "宇治市" },
    { value: "kameoka", label: "亀岡市" },
  ],
  hyogo: [
    { value: "kobe", label: "神戸市" },
    { value: "himeji", label: "姫路市" },
    { value: "nishinomiya", label: "西宮市" },
    { value: "amagasaki", label: "尼崎市" },
  ],
  aichi: [
    { value: "nagoya", label: "名古屋市" },
    { value: "toyota", label: "豊田市" },
    { value: "okazaki", label: "岡崎市" },
    { value: "ichinomiya", label: "一宮市" },
  ],
}

const priceRanges = [
  "指定なし",
  "3,000万円以下",
  "3,000万円〜5,000万円",
  "5,000万円〜7,000万円",
  "7,000万円〜1億円",
  "1億円以上",
]

export default function HomePage() {
  const [selectedPrefecture, setSelectedPrefecture] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [selectedPriceRange, setSelectedPriceRange] = useState("")

  const handlePrefectureChange = (prefecture: string) => {
    setSelectedPrefecture(prefecture)
    setSelectedCity("")
  }

  const handleSearch = () => {
    // 検索処理中画面に遷移
    window.location.href = "/search-loading"
  }

  const handleDownloadCSV = (searchId: number) => {
    // CSVダウンロード処理（実際の実装では検索結果データをCSV形式で出力）
    console.log(`Downloading CSV for search ID: ${searchId}`)
    // 実装例: CSVファイルを生成してダウンロード
  }

  return (
    <div className="min-h-screen bg-background">
      {/* ヘッダー */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">マンション投資検索</h1>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto px-4 py-8">
        {/* 検索セクション */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-foreground mb-4">理想の投資物件を見つけよう</h2>
            <p className="text-xl text-muted-foreground">
              分譲マンション投資に特化した検索で、最適な収益物件を効率的に発見
            </p>
          </div>

          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">都道府県</label>
                  <Select value={selectedPrefecture} onValueChange={handlePrefectureChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="都道府県を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      {prefectures.map((prefecture) => (
                        <SelectItem key={prefecture.value} value={prefecture.value}>
                          {prefecture.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">主要都市</label>
                  <Select value={selectedCity} onValueChange={setSelectedCity} disabled={!selectedPrefecture}>
                    <SelectTrigger>
                      <SelectValue placeholder={selectedPrefecture ? "都市を選択" : "まず都道府県を選択"} />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedPrefecture &&
                        cities[selectedPrefecture]?.map((city) => (
                          <SelectItem key={city.value} value={city.value}>
                            {city.label}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">物件価格帯</label>
                  <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="価格帯を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      {priceRanges.map((range) => (
                        <SelectItem key={range} value={range}>
                          {range}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button
                    onClick={handleSearch}
                    className="w-full h-10 bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    検索する
                  </Button>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Button variant="link" className="text-primary hover:text-primary/80">
                  <a href="/advanced-search">詳細検索はこちら</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 検索履歴セクション */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-foreground">検索履歴</h3>
            <Button variant="outline">履歴をクリア</Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[180px]">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        検索時間
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        エリア
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        物件価格帯
                      </div>
                    </TableHead>
                    <TableHead className="w-[120px]">検索状況</TableHead>
                    <TableHead className="w-[120px] text-center">アクション</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {searchHistory.map((search) => (
                    <TableRow key={search.id}>
                      <TableCell className="font-medium">{search.searchTime}</TableCell>
                      <TableCell>{search.area}</TableCell>
                      <TableCell>{search.priceRange}</TableCell>
                      <TableCell>
                        <Badge
                          variant={search.status === "完了" ? "default" : "secondary"}
                          className={
                            search.status === "完了" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {search.status}
                          {search.status === "完了" && search.resultCount && (
                            <span className="ml-1">({search.resultCount}件)</span>
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDownloadCSV(search.id)}
                          disabled={search.status === "検索中"}
                          className="h-8"
                        >
                          <Download className="h-3 w-3 mr-1" />
                          CSV
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* フッター */}
      <footer className="border-t border-border bg-card mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 マンション投資検索. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
