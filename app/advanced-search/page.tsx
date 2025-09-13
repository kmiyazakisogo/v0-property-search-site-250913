"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Building2, ArrowLeft, Search, Filter } from "lucide-react"
import Link from "next/link"

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

const roomLayouts = ["1R", "1K", "1DK", "1LDK", "2K", "2DK", "2LDK", "3K", "3DK", "3LDK", "4LDK以上"]

export default function AdvancedSearchPage() {
  const [selectedPrefecture, setSelectedPrefecture] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [priceRange, setPriceRange] = useState([3000, 10000])
  const [yieldRange, setYieldRange] = useState([3.0, 6.0])
  const [ageRange, setAgeRange] = useState([0, 30])
  const [areaRange, setAreaRange] = useState([20, 100])
  const [selectedLayouts, setSelectedLayouts] = useState<string[]>([])
  const [nearStation, setNearStation] = useState("")
  const [walkingMinutes, setWalkingMinutes] = useState([1, 10])

  const handlePrefectureChange = (prefecture: string) => {
    setSelectedPrefecture(prefecture)
    setSelectedCity("")
  }

  const handleLayoutChange = (layout: string, checked: boolean) => {
    if (checked) {
      setSelectedLayouts([...selectedLayouts, layout])
    } else {
      setSelectedLayouts(selectedLayouts.filter((l) => l !== layout))
    }
  }

  const handleSearch = () => {
    // 検索処理中画面に遷移
    window.location.href = "/search-loading"
  }

  const resetFilters = () => {
    setSelectedPrefecture("")
    setSelectedCity("")
    setPriceRange([3000, 10000])
    setYieldRange([3.0, 6.0])
    setAgeRange([0, 30])
    setAreaRange([20, 100])
    setSelectedLayouts([])
    setNearStation("")
    setWalkingMinutes([1, 10])
  }

  return (
    <div className="min-h-screen bg-background">
      {/* ヘッダー */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-5 w-5" />
                <span>ホームに戻る</span>
              </Link>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-2">
                <Building2 className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold text-foreground">詳細検索</h1>
              </div>
            </div>
            <Button variant="outline" onClick={resetFilters}>
              <Filter className="h-4 w-4 mr-2" />
              条件をリセット
            </Button>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">詳細検索条件</h2>
            <p className="text-muted-foreground">分譲マンション投資に最適な物件を詳細な条件で絞り込んで検索できます</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 検索条件フォーム */}
            <div className="lg:col-span-2 space-y-6">
              {/* 物件の種類 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">物件の種類</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="mansion" checked disabled />
                    <Label htmlFor="mansion" className="text-sm font-medium">
                      分譲マンション（専用）
                    </Label>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    現在は分譲マンションに特化したサービスを提供しています
                  </p>
                </CardContent>
              </Card>

              {/* エリア */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">エリア</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">都道府県</Label>
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
                      <Label className="text-sm font-medium">主要都市</Label>
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
                  </div>
                </CardContent>
              </Card>

              {/* 物件価格帯 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">物件価格帯</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="px-2">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={15000}
                      min={1000}
                      step={100}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{priceRange[0].toLocaleString()}万円</span>
                    <span>{priceRange[1].toLocaleString()}万円</span>
                  </div>
                </CardContent>
              </Card>

              {/* 利回り */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">想定利回り</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="px-2">
                    <Slider
                      value={yieldRange}
                      onValueChange={setYieldRange}
                      max={8.0}
                      min={2.0}
                      step={0.1}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{yieldRange[0].toFixed(1)}%</span>
                    <span>{yieldRange[1].toFixed(1)}%</span>
                  </div>
                </CardContent>
              </Card>

              {/* 築年数 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">築年数</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="px-2">
                    <Slider value={ageRange} onValueChange={setAgeRange} max={50} min={0} step={1} className="w-full" />
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>築{ageRange[0]}年</span>
                    <span>築{ageRange[1]}年</span>
                  </div>
                </CardContent>
              </Card>

              {/* 面積 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">専有面積</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="px-2">
                    <Slider
                      value={areaRange}
                      onValueChange={setAreaRange}
                      max={150}
                      min={15}
                      step={5}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{areaRange[0]}㎡</span>
                    <span>{areaRange[1]}㎡</span>
                  </div>
                </CardContent>
              </Card>

              {/* 間取り */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">間取り</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-3">
                    {roomLayouts.map((layout) => (
                      <div key={layout} className="flex items-center space-x-2">
                        <Checkbox
                          id={layout}
                          checked={selectedLayouts.includes(layout)}
                          onCheckedChange={(checked) => handleLayoutChange(layout, checked as boolean)}
                        />
                        <Label htmlFor={layout} className="text-sm">
                          {layout}
                        </Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 駅からの距離 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">最寄り駅からの距離</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="station" className="text-sm font-medium">
                      駅名（任意）
                    </Label>
                    <Input
                      id="station"
                      placeholder="例：新宿駅、渋谷駅"
                      value={nearStation}
                      onChange={(e) => setNearStation(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">徒歩時間</Label>
                    <div className="px-2">
                      <Slider
                        value={walkingMinutes}
                        onValueChange={setWalkingMinutes}
                        max={20}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>徒歩{walkingMinutes[0]}分</span>
                      <span>徒歩{walkingMinutes[1]}分</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 検索実行パネル */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">検索条件サマリー</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">物件種類:</span>
                        <span>分譲マンション</span>
                      </div>
                      {(selectedPrefecture || selectedCity) && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">エリア:</span>
                          <span>
                            {selectedPrefecture && prefectures.find((p) => p.value === selectedPrefecture)?.label}
                            {selectedPrefecture && selectedCity && " - "}
                            {selectedCity && cities[selectedPrefecture]?.find((c) => c.value === selectedCity)?.label}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">価格:</span>
                        <span>
                          {priceRange[0].toLocaleString()}万円〜{priceRange[1].toLocaleString()}万円
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">利回り:</span>
                        <span>
                          {yieldRange[0].toFixed(1)}%〜{yieldRange[1].toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">築年数:</span>
                        <span>
                          築{ageRange[0]}年〜築{ageRange[1]}年
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">面積:</span>
                        <span>
                          {areaRange[0]}㎡〜{areaRange[1]}㎡
                        </span>
                      </div>
                      {selectedLayouts.length > 0 && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">間取り:</span>
                          <span>{selectedLayouts.join(", ")}</span>
                        </div>
                      )}
                    </div>

                    <Separator />

                    <Button
                      onClick={handleSearch}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                      size="lg"
                    >
                      <Search className="h-4 w-4 mr-2" />
                      この条件で検索
                    </Button>

                    <Button variant="outline" onClick={resetFilters} className="w-full bg-transparent">
                      条件をリセット
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
