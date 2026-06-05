import React from 'react'

interface CardProps {
  children: React.ReactNode
}

interface CardHeaderProps {
  children: React.ReactNode
}

interface CardTitleProps {
  children: React.ReactNode
}

interface CardDescriptionProps {
  children: React.ReactNode
}

interface CardContentProps {
  children: React.ReactNode
}

export const Card: React.FC<CardProps> = ({ children }) => (
  <div className="card">{children}</div>
)

export const CardHeader: React.FC<CardHeaderProps> = ({ children }) => (
  <div className="mb-6">{children}</div>
)

export const CardTitle: React.FC<CardTitleProps> = ({ children }) => (
  <h2 className="text-lg font-poppins font-bold text-dark-navy">{children}</h2>
)

export const CardDescription: React.FC<CardDescriptionProps> = ({ children }) => (
  <p className="text-sm text-gray-600 font-inter mt-1">{children}</p>
)

export const CardContent: React.FC<CardContentProps> = ({ children }) => (
  <div>{children}</div>
)