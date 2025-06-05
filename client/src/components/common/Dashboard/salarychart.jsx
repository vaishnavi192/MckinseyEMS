import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const SalaryChart = ({ balancedata }) => {
    // Dummy data for sample
    const dummyData = [
        {
            month: "Jan",
            SalriesPaid: 450000,
            AvailableAmount: 550000
        },
        {
            month: "Feb",
            SalriesPaid: 480000,
            AvailableAmount: 520000
        },
        {
            month: "Mar",
            SalriesPaid: 460000,
            AvailableAmount: 540000
        },
        {
            month: "Apr",
            SalriesPaid: 500000,
            AvailableAmount: 500000
        },
        {
            month: "May",
            SalriesPaid: 470000,
            AvailableAmount: 530000
        },
        {
            month: "Jun",
            SalriesPaid: 490000,
            AvailableAmount: 510000
        }
    ]

    const chartData = []
    let trendingUp = 0

    // Use dummy data if no real data is available
    if (!balancedata || !balancedata.balance || !Array.isArray(balancedata.balance) || balancedata.balance.length === 0) {
        chartData.push(...dummyData)
        // Calculate trending for dummy data
        const lastIndex = chartData.length - 1
        const prevIndex = lastIndex - 1
        const difference = chartData[lastIndex].AvailableAmount - chartData[prevIndex].AvailableAmount
        trendingUp = Math.round((difference * 100) / chartData[prevIndex].AvailableAmount)
    } else {
        // Process real data if available
        for (let index = 0; index < balancedata.balance.length; index++) {
            const balance = balancedata.balance[index]
            if (balance && balance.expensemonth && balance.totalexpenses && balance.availableamount) {
                chartData.push({
                    month: balance.expensemonth,
                    SalriesPaid: balance.totalexpenses,
                    AvailableAmount: balance.availableamount
                })
            }
        }

        if (chartData.length >= 2) {
            const lastIndex = chartData.length - 1
            const prevIndex = lastIndex - 1
            const difference = chartData[lastIndex].AvailableAmount - chartData[prevIndex].AvailableAmount
            trendingUp = Math.round((difference * 100) / chartData[prevIndex].AvailableAmount)
        }
    }

    const chartConfig = {
        desktop: {
            label: "Salaries Paid",
            color: "hsl(var(--chart-1))",
        },
        mobile: {
            label: "Available Balance",
            color: "hsl(var(--chart-2))",
        },
    }

    return (
        <div className="salary-container flex flex-col min-[250px]:gap-3 sm:gap-1 h-auto">
            <div className="heading px-2 my-2 min-[250px]:px-3">
                <h1 className="min-[250px]:text-xl xl:text-3xl font-bold min-[250px]:text-center sm:text-start">Balance Chart</h1>
            </div>
            <Card className="mx-2">
                <CardHeader>
                    <CardTitle className="min-[250px]:text-xs sm:text-md md:text-lg lg:text-xl">
                        Available Salary Amount : {chartData.length > 0 ? chartData[chartData.length - 1].AvailableAmount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }) : 0}
                    </CardTitle>
                    <CardDescription className="min-[250px]:text-xs sm:text-md md:text-lg lg:text-xl">
                        Salaries Chart
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig}>
                        <AreaChart
                            accessibilityLayer
                            data={chartData}
                            margin={{
                                left: 12,
                                right: 12,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="line" className="p-2" />}
                                className="p-[2px] flex gap-1 items-center min-[250px]:text-xs sm:text-xs"
                            />
                            <Area
                                dataKey="SalriesPaid"
                                type="natural"
                                fill="var(--color-mobile)"
                                fillOpacity={0.4}
                                stroke="var(--color-mobile)"
                                stackId="a"
                            />
                            <Area
                                dataKey="AvailableAmount"
                                type="natural"
                                fill="var(--color-desktop)"
                                fillOpacity={0.4}
                                stroke="var(--color-desktop)"
                                stackId="a"
                            />
                            <ChartLegend content={<ChartLegendContent />} />
                        </AreaChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter>
                    <div className="flex w-full items-start gap-2 text-sm">
                        <div className="grid gap-2">
                            <div className="flex items-center gap-2 font-medium leading-none">
                                {chartData.length >= 2 ? (
                                    <>
                                        Trending up by {trendingUp} % this month
                                        <TrendingUp className="h-4 w-4" />
                                    </>
                                ) : (
                                    "Insufficient data for trend calculation"
                                )}
                            </div>
                            <div className="flex items-center gap-2 leading-none text-muted-foreground">
                                {chartData.length > 0 ? `${chartData[0].month} 2024 - ${chartData[chartData.length - 1].month} 2024` : null}
                            </div>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}