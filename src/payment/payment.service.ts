import { ConflictException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { UserService } from 'src/user/user.service'
import { PaymentStatus } from '@prisma/client'
import { PaymentDto } from './dto/payment.dto'
import { returnPaymentObject } from './return-payment.object'

@Injectable()
export class PaymentService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService
  ) {}

  async checkout(dto: PaymentDto, userId: string) {
    const user = await this.userService.getById(userId)

    if (user.isHasPremium)
      throw new ConflictException(
        'The user already has an active premium subscription.'
      )

    // Create payment record
    await this.prisma.payment.create({
      data: {
        status: PaymentStatus.PAYED, // Auto approve payment
        amount: dto.amount,
        user: {
          connect: {
            id: userId
          }
        }
      }
    })

    // Automatically give premium access
    await this.prisma.user.update({
      where: {
        id: userId
      },
      data: {
        isHasPremium: true
      }
    })

    // Return success URL directly
    return { url: `${process.env.APP_URL}/thanks` }
  }

  /* Requests for admin */

  async getAll() {
    return this.prisma.payment.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      select: returnPaymentObject
    })
  }

  async delete(id: string) {
    return this.prisma.payment.delete({
      where: {
        id
      }
    })
  }
}
