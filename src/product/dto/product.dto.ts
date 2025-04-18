import { Type } from 'class-transformer'
import { ArrayMinSize, isNotEmpty, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class ProductDto {
	@IsString({
		message: 'Название обязательно'
	})
	@IsNotEmpty({ message: 'Название не может быть пустым' })
	title: string

	@IsString({ message: 'Описание обязательно' })
	@IsNotEmpty({ message: 'Описание не может быть пустым' })
	description: string

	@IsNumber({}, { message: 'Цена должна быть числом' })
	@IsNotEmpty({ message: 'Цена не может быть пустой' })
	price: number

	@IsString({
		message: 'Укажите хотя бы одну картинку',
		each: true
	})
	@ArrayMinSize(1, { message: 'Должна быть хотя бы одна картинка' })
	@IsNotEmpty({
		each: true,
		message: 'Путь к картинке не может быть пустым'
	})
	images: string[]

	@IsString({
		message: 'Категория обязательна'
	})
	@IsNotEmpty({ message: 'ID категории не может быть пустым' })
	categoryId: string

	@IsString({
		message: 'Цвет обязателен'
	})
	@IsNotEmpty({ message: 'ID цвета не может быть пустым' })
	colorId: string


	@IsString({
		message: 'Цвет обязателен'
	})
	@IsNotEmpty({ message: 'ID цвета не может быть пустым' })
	createdAt: string

	@IsString({
		message: 'Цвет обязателен'
	})
	@IsNotEmpty({ message: 'ID цвета не может быть пустым' })
	video: string

	@Type(() => Number)
	@IsNumber()
	times: number
	
	@Type(() => Number)
	@IsNumber({}, { each: true, message: 'Каждая сумма должна быть числом' })
	@IsOptional()
	donationAmounts: string[]
	


	@IsString({ each: true, message: 'Каждое описание должно быть строкой' })
	@IsOptional()
	donationDescriptions: string[]
	

	
}