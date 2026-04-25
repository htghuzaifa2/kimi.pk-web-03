
'use client';

import { useCart } from '@/hooks/use-cart';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Link from 'next/link';
import { CreditCard, ShoppingCart, Banknote, Truck } from 'lucide-react';
import { WHATSAPP_PHONE_NUMBER, WHATSAPP_MESSAGE_HEADER, BLUR_DATA_URL } from '@/lib/constants';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { pakistanProvinces, citiesByProvince } from '@/lib/pakistan-locations';
import { useState, useEffect } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Invalid email address.').optional().or(z.literal('')),
  phone: z.string().min(1, 'Phone number is required.'),
  province: z.string().min(1, 'Province is required.'),
  city: z.string().optional(),
  address: z.string().min(1, 'Address is required.'),
  paymentMethod: z.enum(['advance', 'cod'], {
    required_error: 'You need to select a payment method.',
  }),
});

function CheckoutSkeleton() {
  return (
     <div className="container mx-auto px-4 py-12">
        <p>Loading checkout...</p>
     </div>
  )
}


export default function CheckoutPage() {
  const { cartItems, subtotal, shippingCost, total: cartTotal, isCartLoading } = useCart();
  const [selectedProvince, setSelectedProvince] = useState<keyof typeof citiesByProvince | ''>('');
  const [currentPaymentMethod, setCurrentPaymentMethod] = useState<string>('');
  const [total, setTotal] = useState(cartTotal);
  
  const COD_FEE = 50;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      province: '',
      city: '',
      address: '',
      paymentMethod: undefined,
    },
  });

  const paymentMethod = form.watch('paymentMethod');

  useEffect(() => {
    setCurrentPaymentMethod(paymentMethod);
    if (paymentMethod === 'cod') {
        setTotal(cartTotal + COD_FEE);
    } else {
        setTotal(cartTotal);
    }
  }, [paymentMethod, cartTotal]);


  function onSubmit(values: z.infer<typeof formSchema>) {
    const itemsText = cartItems
      .map(item => `*${item.product.name}* (ID: ${item.product.id})\n  - Qty: ${item.quantity}\n  - Price: PKR ${item.product.price * item.quantity}`)
      .join('\n\n');
      
    const breakdownText = `Subtotal: PKR ${subtotal}\nShipping: PKR ${shippingCost}${values.paymentMethod === 'cod' ? `\nCOD Fee: PKR ${COD_FEE}` : ''}\n\n*Total Amount: PKR ${total}*`;
    
    const customerDetails = `
*CUSTOMER DETAILS*
- Name: ${values.name}
- Phone: ${values.phone}${values.email ? `\n- Email: ${values.email}` : ''}
- Address: ${values.address}, ${values.city ? `${values.city}, ` : ''}${values.province}
- Payment: *${values.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Advance Payment'}*
    `;

    const message = `${WHATSAPP_MESSAGE_HEADER}\n\n*ORDER SUMMARY*\n--------------------\n${itemsText}\n--------------------\n${breakdownText}\n--------------------${customerDetails}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  if (isCartLoading) {
    return <CheckoutSkeleton />;
  }

  if (cartItems.length === 0 && !isCartLoading) {
    return (
        <div className="container mx-auto px-4 py-12 text-center">
             <div className="flex h-[60vh] flex-grow flex-col items-center justify-center gap-4 text-center px-6">
                <div className="rounded-full bg-primary/10 p-4 text-primary">
                    <ShoppingCart className="h-12 w-12" />
                </div>
                <h1 className="text-3xl font-bold font-headline mt-4">Your Cart is Empty</h1>
                <p className="text-muted-foreground max-w-md">Looks like you haven't added anything to your cart yet. Browse our products to find something you like!</p>
                <Button asChild className="mt-4">
                    <Link href="/products">Continue Shopping</Link>
                </Button>
            </div>
        </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold font-headline text-primary tracking-tight">Checkout</h1>
        <p className="mt-3 text-lg text-muted-foreground">Please fill in your details to complete the order</p>
      </header>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="lg:col-span-3">
            <Card>
                <CardHeader>
                <h2 className="text-2xl font-bold">Customer Information</h2>
                </CardHeader>
                <CardContent className="space-y-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                            <Input placeholder="Your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <div className="grid xs:grid-cols-2 gap-6">
                        <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Email Address <span className="text-muted-foreground">(Optional)</span></FormLabel>
                            <FormControl>
                                <Input placeholder="your.email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <Input placeholder="+923001234567" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                    <div className="grid xs:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="province"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Province</FormLabel>
                                <Select onValueChange={(value) => {
                                    field.onChange(value);
                                    setSelectedProvince(value as keyof typeof citiesByProvince);
                                    form.setValue('city', '');
                                }} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                    <SelectValue placeholder="Select your province" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {pakistanProvinces.map(province => (
                                        <SelectItem key={province} value={province}>{province}</SelectItem>
                                    ))}
                                </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>City</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value} disabled={!selectedProvince}>
                                <FormControl>
                                    <SelectTrigger>
                                    <SelectValue placeholder="Select your city" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {selectedProvince && citiesByProvince[selectedProvince]?.map(city => (
                                        <SelectItem key={city} value={city}>{city}</SelectItem>
                                    ))}
                                </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Shipping Address</FormLabel>
                            <FormControl>
                            <Textarea placeholder="Your complete shipping address" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    
                    <FormField
                        control={form.control}
                        name="paymentMethod"
                        render={({ field }) => (
                            <FormItem className="space-y-4">
                                <FormLabel className="text-base font-semibold">Payment Method</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="grid grid-cols-1 xs:grid-cols-2 gap-4"
                                    >
                                    <FormItem>
                                        <FormControl>
                                            <RadioGroupItem value="advance" id="advance" className="sr-only" />
                                        </FormControl>
                                        <FormLabel
                                            htmlFor="advance"
                                            className={cn(
                                                "flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
                                                field.value === 'advance' && "border-primary shadow-md"
                                            )}
                                        >
                                            <Banknote className="mb-3 h-8 w-8" />
                                            Advance Payment
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem>
                                        <FormControl>
                                            <RadioGroupItem value="cod" id="cod" className="sr-only" />
                                        </FormControl>
                                        <FormLabel
                                            htmlFor="cod"
                                            className={cn(
                                                "flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
                                                field.value === 'cod' && "border-primary shadow-md"
                                            )}
                                        >
                                            <Truck className="mb-3 h-8 w-8" />
                                            Cash on Delivery
                                        </FormLabel>
                                    </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                                {currentPaymentMethod === 'cod' && (
                                     <div className="text-center text-sm text-muted-foreground bg-secondary/50 p-3 rounded-md">
                                        Choosing Cash on Delivery adds a <span className="font-bold text-foreground">Rs. 50</span> confirmation fee. To avoid the fee, select Advance Payment.
                                     </div>
                                )}
                            </FormItem>
                        )}
                    />

                    <Button type="submit" size="lg" className="w-full">
                        <CreditCard className="mr-2 h-5 w-5"/> Confirm Order via WhatsApp
                    </Button>
                </CardContent>
            </Card>
            </div>
            
            <div className="lg:col-span-2">
                <Card className="sticky top-20">
                    <CardHeader>
                        <h2 className="text-2xl font-bold">Order Summary</h2>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {cartItems.map(item => (
                                <div key={item.product.id} className="flex items-center gap-4">
                                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                                        <Image
                                            src={item.product.images[0].url}
                                            alt={item.product.images[0].altText}
                                            fill
                                            className="object-contain"
                                            sizes="64px"
                                            placeholder="blur"
                                            blurDataURL={BLUR_DATA_URL}
                                        />
                                    </div>
                                    <div className="flex-grow">
                                        <Link href={`/products/${item.product.slug}`} className="font-semibold text-sm hover:underline">
                                            {item.product.name}
                                        </Link>
                                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="text-sm font-medium">PKR {item.product.price * item.quantity}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                    <CardFooter className="flex-col items-stretch space-y-4">
                        <Separator />
                        <div className="space-y-2 text-base">
                            <div className="flex justify-between">
                                <p className="text-muted-foreground">Subtotal</p>
                                <p className="font-medium">PKR {subtotal}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-muted-foreground">Shipping</p>
                                <p className="font-medium">PKR {shippingCost}</p>
                            </div>
                            {currentPaymentMethod === 'cod' && (
                                <div className="flex justify-between">
                                    <p className="text-muted-foreground">COD Fee</p>
                                    <p className="font-medium">PKR {COD_FEE}</p>
                                </div>
                            )}
                        </div>
                        <Separator />
                        <div className="flex justify-between text-xl font-bold">
                            <p>Total</p>
                            <p>PKR {total}</p>
                        </div>
                        <p className="text-xs text-muted-foreground pt-2">
                           After submitting, you will be redirected to WhatsApp to confirm your order.
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </form>
      </Form>
    </div>
  );
}
