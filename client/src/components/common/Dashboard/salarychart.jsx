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
export const SalaryChart = () => {
    const chartData = [
        { month: "January", SalriesPaid: 250000, AvailableAmount: 800000 },
        { month: "February", SalriesPaid: 300000, AvailableAmount: 500000 },
        { month: "March", SalriesPaid: 300000, AvailableAmount: 700000 },
        { month: "April", SalriesPaid: 350000, AvailableAmount: 350000 },
        { month: "May", SalriesPaid: 350000, AvailableAmount: 800000 },
        { month: "June", SalriesPaid: 300000, AvailableAmount: 500000 },
        { month: "July", SalriesPaid: 300000, AvailableAmount: 600000 },
        { month: "August", SalriesPaid: 350000, AvailableAmount: 250000 },
        { month: "September", SalriesPaid: 200000, AvailableAmount: 550000 },
        { month: "October", SalriesPaid: 350000, AvailableAmount: 50000 },
        { month: "November", SalriesPaid: 350000, AvailableAmount: 600000 },
        { month: "December", SalriesPaid: 450000, AvailableAmount: 250000 },
    ]
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
        // <div>
            <Card>
                <CardHeader>
                    <CardTitle>Available Salary Amount : 250000</CardTitle>
                    <CardDescription>
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
                                className="p-2 flex gap-3 items-center"
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
                                Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                            </div>
                            <div className="flex items-center gap-2 leading-none text-muted-foreground">
                                January - June 2024
                            </div>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        
    )
}